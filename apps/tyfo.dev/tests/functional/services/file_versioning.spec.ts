import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import StorageService from '#services/storage_service'
import ObjectRepository from '#repositories/object_repository'
import drive from '@adonisjs/drive/services/main'
import { Buffer } from 'node:buffer'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import env from '#start/env'
import app from '@adonisjs/core/services/app'
import ObjectModel from '#models/object'
import { DateTime } from 'luxon'

// Fonction utilitaire pour créer un MultipartFile simulé pour les tests
async function createMockMultipartFile(content = 'contenu test', name = 'test.txt') {
  // Déterminer le type MIME en fonction de l'extension du fichier
  let mimeType = 'text/plain' // Par défaut
  if (name.endsWith('.pdf')) {
    mimeType = 'application/pdf'
  } else if (name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    mimeType = 'image/jpeg'
  } else if (name.endsWith('.png')) {
    mimeType = 'image/png'
  }
  const CUSTOM_TMP_DIR = join(app.tmpPath(), env.get('TEST_TMP_DIR', 'test-tmp'))

  // S'assurer que le répertoire existe
  await mkdir(CUSTOM_TMP_DIR, { recursive: true })

  // Créer un fichier fictif
  const tmpFilePath = join(CUSTOM_TMP_DIR, name)
  await writeFile(tmpFilePath, content)

  // Créer un MultipartFile avec le chemin temporaire
  const multipartFile = new MultipartFile(
    {
      fieldName: 'file',
      clientName: name,
      headers: { 'content-type': 'text/plain' },
    },
    {}
  )

  multipartFile.tmpPath = tmpFilePath
  multipartFile.size = Buffer.from(content).length
  // Définir le type MIME complet pour que la méthode processUploadedFile l'utilise correctement
  multipartFile.type = mimeType
  // Note: isValid est une propriété calculée en lecture seule dans MultipartFile

  return multipartFile
}

// Repository de test pour les tests
class TestObjectRepository extends ObjectRepository {
  // Objets fictifs pour les tests
  private objects: Partial<ObjectModel>[] = []
  private lastId = 0
  private lastRevision = 0

  constructor() {
    // Passer ObjectModel à la classe parente
    super(ObjectModel)
  }

  // Implémentation des méthodes nécessaires pour le test
  override async create(data: Partial<ObjectModel>): Promise<ObjectModel> {
    const id = ++this.lastId
    const createdAt = DateTime.now()
    const updatedAt = DateTime.now()

    // Créer un objet qui ressemble à un ObjectModel
    const object = {
      id,
      createdAt,
      updatedAt,
      ...data,
    } as unknown as ObjectModel

    this.objects.push(object)
    return object
  }

  override async findByUuid(uuid: string): Promise<ObjectModel | null> {
    const object = this.objects.find((obj) => obj.uuid === uuid)
    return (object as ObjectModel) || null
  }

  override async getRevision(_folderId: number, _name: string): Promise<number> {
    // Retourne la révision suivante pour les tests
    return ++this.lastRevision
  }

  // Autres méthodes requises par l'héritage
  override async findByHash(_hash: string): Promise<ObjectModel | null> {
    return null
  }

  override async findByFolderAndName(
    _folderId: number,
    _name: string
  ): Promise<ObjectModel | null> {
    return null
  }

  override async listByFolder(
    _folderId: number,
    _page?: number,
    _limit?: number
  ): Promise<ObjectModel[]> {
    return []
  }

  override async listByUser(
    _userId: number,
    _page: number = 1,
    _limit: number = 20
  ): Promise<ObjectModel[]> {
    return []
  }

  // Implémentation de la méthode list manquante
  async list(): Promise<ObjectModel[]> {
    return this.objects as unknown as ObjectModel[]
  }

  override async update(uuid: string, data: Partial<ObjectModel>): Promise<ObjectModel> {
    const objectIndex = this.objects.findIndex((obj) => obj.uuid === uuid)
    if (objectIndex === -1) {
      throw new Error('Objet non trouvé')
    }

    // Mettre à jour l'objet avec les nouvelles données
    this.objects[objectIndex] = {
      ...this.objects[objectIndex],
      ...data,
      updatedAt: DateTime.now(),
    }

    return this.objects[objectIndex] as unknown as ObjectModel
  }

  override async remove(uuid: string): Promise<void> {
    // Supprimer l'objet du tableau
    const objectIndex = this.objects.findIndex((obj) => obj.uuid === uuid)
    if (objectIndex !== -1) {
      this.objects.splice(objectIndex, 1)
    }
  }

  // Méthodes spécifiques pour les tests
  async listRevisions(objectUuid: string): Promise<ObjectModel[]> {
    // Trouver l'objet correspondant à l'UUID
    const object = await this.findByUuid(objectUuid)

    if (!object) {
      return []
    }

    // Récupérer toutes les versions du même fichier (même nom et dossier)
    const versions = this.objects.filter(
      (obj) => obj.name === object.name && obj.folderId === object.folderId
    ) as ObjectModel[]

    // Trier par révision (la plus récente d'abord)
    return versions.sort((a, b) => b.revision - a.revision)
  }
}

test.group('FileVersioning', (group) => {
  let service: StorageService
  let objectRepository: TestObjectRepository
  let fakeDisk: ReturnType<typeof drive.fake>

  group.each.setup(async () => {
    fakeDisk = drive.fake()
    objectRepository = new TestObjectRepository()
    service = new StorageService(objectRepository, fakeDisk)

    await db.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    drive.restore()
    await db.rollbackGlobalTransaction()
  })

  test('createNewVersion should create a new revision of an existing file', async ({ assert }) => {
    // Créer un fichier initial via le service
    const userId = 1
    const folderId = 1
    const fileName = 'document.txt'

    // Préparer un fichier pour le test (première version)
    const fileContentV1 = 'Contenu de la version 1'
    const multipartFileV1 = await createMockMultipartFile(fileContentV1, fileName)

    // Créer la première version du fichier
    const objectV1 = await service.processUploadedFile(multipartFileV1, userId, folderId)

    // Vérifier que la première version est bien enregistrée avec revision = 1
    assert.exists(objectV1)
    assert.equal(objectV1.revision, 1)
    assert.equal(objectV1.name, fileName)

    // Préparer une nouvelle version du même fichier
    const fileContentV2 = 'Contenu de la version 2 - modifié'
    const multipartFileV2 = await createMockMultipartFile(fileContentV2, fileName)

    // Créer une nouvelle version du fichier en utilisant la méthode à implémenter
    const objectV2 = await service.createNewVersion(multipartFileV2, objectV1.uuid, userId)

    // Vérifier que la nouvelle version est bien créée
    assert.exists(objectV2)
    assert.equal(objectV2.revision, 2)
    assert.equal(objectV2.name, fileName)
    assert.equal(objectV2.folderId, objectV1.folderId)
    assert.notEqual(objectV2.uuid, objectV1.uuid)
    assert.notEqual(objectV2.hash, objectV1.hash)
    assert.notEqual(objectV2.location, objectV1.location)

    // Vérifier que le contenu des deux versions est différent en accédant aux fichiers
    const fileV1Exists = await service.fileExists(objectV1.location)
    const fileV2Exists = await service.fileExists(objectV2.location)

    assert.isTrue(fileV1Exists, 'Le fichier de la version 1 devrait toujours exister')
    assert.isTrue(fileV2Exists, 'Le fichier de la version 2 devrait exister')
  })

  test('getFileVersions should return all versions of a file', async ({ assert }) => {
    // Créer un fichier initial via le service
    const userId = 1
    const folderId = 1
    const fileName = 'document-versions.txt'

    // Préparer et créer la première version du fichier
    const fileContentV1 = 'Contenu de la version 1'
    const multipartFileV1 = await createMockMultipartFile(fileContentV1, fileName)
    const objectV1 = await service.processUploadedFile(multipartFileV1, userId, folderId)

    // Créer une deuxième version du fichier
    const fileContentV2 = 'Contenu de la version 2 - modifié'
    const multipartFileV2 = await createMockMultipartFile(fileContentV2, fileName)
    const objectV2 = await service.createNewVersion(multipartFileV2, objectV1.uuid, userId)

    // Créer une troisième version du fichier
    const fileContentV3 = 'Contenu de la version 3 - encore modifié'
    const multipartFileV3 = await createMockMultipartFile(fileContentV3, fileName)
    const objectV3 = await service.createNewVersion(multipartFileV3, objectV2.uuid, userId)

    // Récupérer l'historique des versions pour la dernière version
    const versions = await service.getFileVersions(objectV3.uuid)

    // Vérifier que nous avons bien les 3 versions
    assert.equal(versions.length, 3)

    // Vérifier l'ordre des versions (de la plus récente à la plus ancienne)
    assert.equal(versions[0].revision, 3)
    assert.equal(versions[1].revision, 2)
    assert.equal(versions[2].revision, 1)

    // Vérifier que les UUIDs sont différents
    assert.equal(versions[0].uuid, objectV3.uuid)
    assert.equal(versions[1].uuid, objectV2.uuid)
    assert.equal(versions[2].uuid, objectV1.uuid)

    // Vérifier que le nom de fichier est identique pour toutes les versions
    versions.forEach((version: ObjectModel) => {
      assert.equal(version.name, fileName)
      assert.equal(version.folderId, folderId)
    })
  })

  test('restoreVersion should make an old version current', async ({ assert }) => {
    // Créer un fichier initial avec plusieurs versions
    const userId = 1
    const folderId = 1
    const fileName = 'document-to-restore.txt'

    // Première version du fichier
    const fileContentV1 = 'Contenu de la version 1'
    const multipartFileV1 = await createMockMultipartFile(fileContentV1, fileName)
    const objectV1 = await service.processUploadedFile(multipartFileV1, userId, folderId)
    assert.equal(objectV1.revision, 1)

    // Deuxième version du fichier
    const fileContentV2 = 'Contenu de la version 2'
    const multipartFileV2 = await createMockMultipartFile(fileContentV2, fileName)
    const objectV2 = await service.createNewVersion(multipartFileV2, objectV1.uuid, userId)
    assert.equal(objectV2.revision, 2)

    // Troisième version du fichier
    const fileContentV3 = 'Contenu de la version 3'
    const multipartFileV3 = await createMockMultipartFile(fileContentV3, fileName)
    const objectV3 = await service.createNewVersion(multipartFileV3, objectV2.uuid, userId)
    assert.equal(objectV3.revision, 3)

    // Restaurer la première version (objectV1)
    const restoredObject = await service.restoreVersion(objectV1.uuid, userId)

    // Vérifier que l'objet restauré est une nouvelle version (revision 4)
    assert.equal(restoredObject.revision, 4)
    assert.notEqual(restoredObject.uuid, objectV1.uuid)
    assert.notEqual(restoredObject.uuid, objectV2.uuid)
    assert.notEqual(restoredObject.uuid, objectV3.uuid)

    // Vérifier que le contenu est le même que celui de la version 1 (même hash)
    assert.equal(restoredObject.hash, objectV1.hash)
    assert.equal(restoredObject.location, objectV1.location)

    // Vérifier que le nom et le dossier sont identiques
    assert.equal(restoredObject.name, fileName)
    assert.equal(restoredObject.folderId, folderId)
  })

  test('updateMetadata should modify file metadata without creating a new revision', async ({
    assert,
  }) => {
    // Créer un fichier initial via le service
    const userId = 1
    const folderId = 1
    const fileName = 'document-metadata.txt'
    const fileContent = 'Contenu du document'

    // Créer le fichier initial
    const multipartFile = await createMockMultipartFile(fileContent, fileName)
    const object = await service.processUploadedFile(multipartFile, userId, folderId)

    // Vérifier l'état initial
    assert.equal(object.name, fileName)
    assert.equal(object.mimeType, 'text/plain')
    assert.equal(object.revision, 1)

    // Mettre à jour les métadonnées
    const newName = 'document-renamed.txt'
    const newMimeType = 'application/text'
    const updatedObject = await service.updateMetadata(object.uuid, {
      name: newName,
      mimeType: newMimeType,
    })

    // Vérifier que les métadonnées ont été mises à jour
    assert.equal(updatedObject.name, newName)
    assert.equal(updatedObject.mimeType, newMimeType)

    // Vérifier que la révision n'a pas changé
    assert.equal(updatedObject.revision, 1)
    assert.equal(updatedObject.uuid, object.uuid)

    // Vérifier que le hash et l'emplacement du fichier n'ont pas changé
    assert.equal(updatedObject.hash, object.hash)
    assert.equal(updatedObject.location, object.location)
  })

  test('moveFile should move a file to a different folder without creating a new revision', async ({
    assert,
  }) => {
    // Créer un fichier initial
    const userId = 1
    const sourceFolderId = 1
    const targetFolderId = 2
    const fileName = 'document-to-move.txt'
    const fileContent = 'Contenu du fichier à déplacer'

    // Créer le fichier initial dans le dossier source
    const multipartFile = await createMockMultipartFile(fileContent, fileName)
    const initialObject = await service.processUploadedFile(multipartFile, userId, sourceFolderId)

    // Vérifier l'état initial
    assert.equal(initialObject.folderId, sourceFolderId)
    assert.equal(initialObject.name, fileName)
    assert.equal(initialObject.revision, 1)

    // Déplacer le fichier vers le dossier cible
    const movedObject = await service.moveFile(initialObject.uuid, targetFolderId, userId)

    // Vérifier que le fichier a été déplacé
    assert.equal(movedObject.folderId, targetFolderId)

    // Vérifier que les autres propriétés n'ont pas changé
    assert.equal(movedObject.name, fileName)
    assert.equal(movedObject.revision, 1)
    assert.equal(movedObject.hash, initialObject.hash)
    assert.equal(movedObject.location, initialObject.location)
    assert.notEqual(movedObject.uuid, initialObject.uuid)

    // Vérifier que l'objet d'origine n'est plus accessible
    const originalObject = await service['objectRepository'].findByUuid(initialObject.uuid)
    assert.isNull(originalObject)
  })

  test('searchByMetadata should find files matching metadata criteria', async ({ assert }) => {
    // Créer quelques fichiers avec des métadonnées différentes
    const userId = 1
    const folderId = 1
    const files = [
      { name: 'document1.txt', content: 'Contenu 1', mimeType: 'text/plain' },
      { name: 'document2.pdf', content: 'Contenu 2', mimeType: 'application/pdf' },
      { name: 'image.jpg', content: 'Image data', mimeType: 'image/jpeg' },
      { name: 'document3.txt', content: 'Contenu 3', mimeType: 'text/plain' },
    ]

    // Créer tous les fichiers
    for (const file of files) {
      const multipartFile = await createMockMultipartFile(file.content, file.name)
      await service.processUploadedFile(multipartFile, userId, folderId)
    }

    // Recherche par nom (partiel)
    const resultsByName = await service.searchByMetadata({ name: 'document' })
    assert.equal(resultsByName.length, 3)
    assert.isTrue(resultsByName.every((obj) => obj.name.includes('document')))

    // Recherche par type MIME exact
    const resultsByMimeType = await service.searchByMetadata({ mimeType: 'text/plain' })
    assert.equal(resultsByMimeType.length, 2)
    assert.isTrue(resultsByMimeType.every((obj) => obj.mimeType === 'text/plain'))

    // Recherche par combinaison de critères
    const resultsByNameAndMime = await service.searchByMetadata({
      name: 'document',
      mimeType: 'text/plain',
    })
    assert.equal(resultsByNameAndMime.length, 2)
    assert.isTrue(
      resultsByNameAndMime.every(
        (obj) => obj.name.includes('document') && obj.mimeType === 'text/plain'
      )
    )

    // Recherche avec filtrage par dossier
    const resultsByFolder = await service.searchByMetadata({ name: 'document' }, folderId)
    assert.equal(resultsByFolder.length, 3)
    assert.isTrue(resultsByFolder.every((obj) => obj.folderId === folderId))

    // Recherche avec filtrage par utilisateur
    const resultsByUser = await service.searchByMetadata({ name: 'document' }, undefined, userId)
    assert.equal(resultsByUser.length, 3)
    assert.isTrue(resultsByUser.every((obj) => obj.userId === userId))

    // Recherche sans résultats
    const emptyResults = await service.searchByMetadata({ name: 'nonexistent' })
    assert.equal(emptyResults.length, 0)
  })
})
