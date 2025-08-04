import { test } from '@japa/runner'
import { generateUuid } from '#utils/uuid_helper'
import { DateTime } from 'luxon'
import { ObjectRepositoryContract } from '#repositories/contracts/object_model_repository_contract'
import ObjectModel from '#models/object'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Folder from '#models/folder'

// Interface pour les données des objets mockés
interface MockObjectData {
  uuid?: string
  userId: number
  folderId: number
  name: string
  mimeType: string
  revision?: number
  hash: string
  location: string
  createdAt?: DateTime
  updatedAt?: DateTime
}

// Classe pour simuler un objet sans dépendre de la base de données
class MockObject implements Partial<ObjectModel> {
  public id: number
  public uuid: string
  public userId: number
  public folderId: number
  public name: string
  public mimeType: string
  public revision: number
  public hash: string
  public location: string
  public createdAt: DateTime
  public updatedAt: DateTime

  constructor(data: MockObjectData, id: number = Math.floor(Math.random() * 1000)) {
    this.id = id
    this.uuid = data.uuid || generateUuid()
    this.userId = data.userId
    this.folderId = data.folderId
    this.name = data.name
    this.mimeType = data.mimeType
    this.revision = data.revision || 1
    this.hash = data.hash
    this.location = data.location
    this.createdAt = data.createdAt || DateTime.now()
    this.updatedAt = data.updatedAt || DateTime.now()
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  toJSON() {
    return {
      id: this.id,
      uuid: this.uuid,
      userId: this.userId,
      folderId: this.folderId,
      name: this.name,
      mimeType: this.mimeType,
      revision: this.revision,
      hash: this.hash,
      location: this.location,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  merge(data: Partial<MockObject>): void {
    Object.assign(this, data)
    this.updatedAt = DateTime.now()
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  async save(): Promise<void> {
    // Dans un mock, rien à faire
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  async delete(): Promise<void> {
    // Dans un mock, rien à faire
  }
}

// Implémentation mockée du repository d'objets
class MockObjectRepository implements ObjectRepositoryContract {
  private objects: MockObject[] = []
  private nextId: number = 1

  async create(data: Partial<ObjectModel>): Promise<MockObject> {
    const object = new MockObject(data as MockObjectData, this.nextId++)
    this.objects.push(object)
    return object
  }

  async findByUuid(uuid: string): Promise<MockObject | null> {
    const object = this.objects.find((obj) => obj.uuid === uuid)
    return object || null
  }

  async findByHash(hash: string): Promise<MockObject | null> {
    const object = this.objects.find((obj) => obj.hash === hash)
    return object || null
  }

  async findByFolder(folderId: number): Promise<MockObject[]> {
    return this.objects.filter((obj) => obj.folderId === folderId)
  }

  async findByFolderAndName(folderId: number, name: string): Promise<MockObject | null> {
    // Trier par révision descendante pour obtenir la dernière version
    const objects = this.objects
      .filter((obj) => obj.folderId === folderId && obj.name === name)
      .sort((a, b) => b.revision - a.revision)

    return objects.length > 0 ? objects[0] : null
  }

  async findByMimeType(mimeType: string): Promise<MockObject[]> {
    return this.objects.filter((obj) => obj.mimeType === mimeType)
  }

  async list(): Promise<MockObject[]> {
    // Trier par date de mise à jour pour simuler l'ordre SQL
    return [...this.objects].sort((a, b) => {
      return b.updatedAt.toUnixInteger() - a.updatedAt.toUnixInteger()
    })
  }

  async listByFolder(folderId: number, page?: number, limit?: number): Promise<MockObject[]> {
    let result = this.objects
      .filter((obj) => obj.folderId === folderId)
      .sort((a, b) => {
        // D'abord trier par nom
        const nameComparison = a.name.localeCompare(b.name)
        if (nameComparison !== 0) return nameComparison
        // Ensuite par révision décroissante
        return b.revision - a.revision
      })

    // Appliquer la pagination si spécifiée
    if (page !== undefined && limit !== undefined) {
      const startIndex = (page - 1) * limit
      result = result.slice(startIndex, startIndex + limit)
    }

    return result
  }

  async listByUser(userId: number, page: number = 1, limit: number = 20): Promise<MockObject[]> {
    let result = this.objects
      .filter((obj) => obj.userId === userId)
      .sort((a, b) => b.updatedAt.toUnixInteger() - a.updatedAt.toUnixInteger())

    // Appliquer la pagination
    const startIndex = (page - 1) * limit
    return result.slice(startIndex, startIndex + limit)
  }

  async update(uuid: string, data: Partial<ObjectModel>): Promise<MockObject> {
    const objectIndex = this.objects.findIndex((obj) => obj.uuid === uuid)
    if (objectIndex === -1) {
      throw new Error('Objet non trouvé')
    }

    this.objects[objectIndex].merge(data as Partial<MockObject>)
    return this.objects[objectIndex]
  }

  async remove(uuid: string): Promise<void> {
    const objectIndex = this.objects.findIndex((obj) => obj.uuid === uuid)
    if (objectIndex !== -1) {
      this.objects.splice(objectIndex, 1)
    }
  }

  async getRevision(folderId: number, name: string): Promise<number> {
    const objects = this.objects
      .filter((obj) => obj.folderId === folderId && obj.name === name)
      .sort((a, b) => b.revision - a.revision)

    return objects.length > 0 ? objects[0].revision + 1 : 1
  }

  async listRevisions(objectUuid: string): Promise<MockObject[]> {
    const object = await this.findByUuid(objectUuid)
    if (!object) return []

    // Récupérer toutes les versions du même fichier (même nom et dossier)
    return this.objects
      .filter((obj) => obj.folderId === object.folderId && obj.name === object.name)
      .sort((a, b) => b.revision - a.revision)
  }

  async getRevisions(objectId: number): Promise<MockObject[]> {
    const object = this.objects.find((obj) => obj.id === objectId)
    if (!object) return []

    // Récupérer toutes les versions du même fichier
    return this.objects
      .filter((obj) => obj.folderId === object.folderId && obj.name === object.name)
      .sort((a, b) => b.revision - a.revision)
  }

  async createRevision(objectId: number, data: Partial<ObjectModel>): Promise<MockObject> {
    const object = this.objects.find((obj) => obj.id === objectId)
    if (!object) {
      throw new Error('Objet non trouvé')
    }

    // Obtenir le numéro de la prochaine révision
    const newRevision = await this.getRevision(object.folderId, object.name)

    // Créer une nouvelle version en utilisant les données existantes et les nouvelles données
    const newObject = await this.create({
      ...object.toJSON(),
      ...data,
      id: undefined, // Ne pas copier l'ID pour créer un nouvel enregistrement
      revision: newRevision,
    })

    return newObject
  }
}

test.group('ObjectRepository Mocked Tests', (group) => {
  let objectRepository: MockObjectRepository

  // Créer une nouvelle instance du repository mocké avant chaque test
  group.each.setup(() => {
    objectRepository = new MockObjectRepository()
  })

  test('create should insert a new object and return it', async ({ assert }) => {
    const objectData = {
      userId: 1,
      folderId: 1,
      name: 'test-document.pdf',
      mimeType: 'application/pdf',
      hash: 'abcdef123456',
      location: '/path/to/storage/test-document.pdf',
    }

    const object = await objectRepository.create(objectData as any)

    assert.exists(object)
    assert.exists(object.uuid)
    assert.equal(object.name, objectData.name)
    assert.equal(object.mimeType, objectData.mimeType)
    assert.equal(object.hash, objectData.hash)
    assert.equal(object.location, objectData.location)
    assert.equal(object.revision, 1)
  })

  test('findByUuid should retrieve an object by its UUID', async ({ assert }) => {
    // Créer un objet
    const objectData = {
      userId: 1,
      folderId: 1,
      name: 'find-by-uuid.pdf',
      mimeType: 'application/pdf',
      hash: 'abcdef123456',
      location: '/path/to/storage/find-by-uuid.pdf',
    }
    const createdObject = await objectRepository.create(objectData as any)

    // Test du findByUuid avec un UUID valide
    const object = await objectRepository.findByUuid(createdObject.uuid)

    // Vérifier que l'objet est trouvé
    assert.exists(object)
    assert.equal(object!.uuid, createdObject.uuid)
    assert.equal(object!.name, objectData.name)

    // Test avec un UUID non existant
    const nonExistentObject = await objectRepository.findByUuid('non-existent-uuid')
    assert.isNull(nonExistentObject)
  })

  test('findByHash should retrieve an object by its hash', async ({ assert }) => {
    const hash = 'unique-hash-12345'
    const objectData = {
      userId: 1,
      folderId: 1,
      name: 'find-by-hash.pdf',
      mimeType: 'application/pdf',
      hash,
      location: '/path/to/storage/find-by-hash.pdf',
    }
    await objectRepository.create(objectData as any)

    // Test du findByHash avec un hash valide
    const object = await objectRepository.findByHash(hash)

    // Vérifier que l'objet est trouvé
    assert.exists(object)
    assert.equal(object!.hash, hash)

    // Test avec un hash non existant
    const nonExistentObject = await objectRepository.findByHash('non-existent-hash')
    assert.isNull(nonExistentObject)
  })

  test('findByFolderAndName should retrieve the latest revision of a file', async ({ assert }) => {
    const folderId = 2
    const fileName = 'multiple-revisions.pdf'

    // Créer plusieurs révisions du même fichier
    const objectData1 = {
      userId: 1,
      folderId,
      name: fileName,
      mimeType: 'application/pdf',
      hash: 'rev1-hash',
      location: '/path/to/storage/rev1.pdf',
      revision: 1,
    }
    const objectData2 = {
      userId: 1,
      folderId,
      name: fileName,
      mimeType: 'application/pdf',
      hash: 'rev2-hash',
      location: '/path/to/storage/rev2.pdf',
      revision: 2,
    }
    const objectData3 = {
      userId: 1,
      folderId,
      name: fileName,
      mimeType: 'application/pdf',
      hash: 'rev3-hash',
      location: '/path/to/storage/rev3.pdf',
      revision: 3,
    }

    await objectRepository.create(objectData1 as any)
    await objectRepository.create(objectData2 as any)
    await objectRepository.create(objectData3 as any)

    // Rechercher par dossier et nom
    const latestObject = await objectRepository.findByFolderAndName(folderId, fileName)

    // Vérifier qu'on récupère bien la dernière révision
    assert.exists(latestObject)
    assert.equal(latestObject!.revision, 3)
    assert.equal(latestObject!.hash, 'rev3-hash')
  })

  test('listByFolder should retrieve objects in a folder with pagination', async ({ assert }) => {
    const folderId = 3

    // Créer plusieurs objets dans le même dossier
    const objectsData = [
      {
        userId: 1,
        folderId,
        name: 'a-document.pdf',
        mimeType: 'application/pdf',
        hash: 'hash-a',
        location: '/path/to/storage/a-document.pdf',
      },
      {
        userId: 1,
        folderId,
        name: 'b-document.pdf',
        mimeType: 'application/pdf',
        hash: 'hash-b',
        location: '/path/to/storage/b-document.pdf',
      },
      {
        userId: 2,
        folderId,
        name: 'c-document.pdf',
        mimeType: 'application/pdf',
        hash: 'hash-c',
        location: '/path/to/storage/c-document.pdf',
      },
    ]

    await Promise.all(objectsData.map((data) => objectRepository.create(data as any)))

    // Tester sans pagination
    const allObjects = await objectRepository.listByFolder(folderId)
    assert.lengthOf(allObjects, 3)

    // Vérifier l'ordre (tri par nom)
    assert.equal(allObjects[0].name, 'a-document.pdf')
    assert.equal(allObjects[1].name, 'b-document.pdf')
    assert.equal(allObjects[2].name, 'c-document.pdf')

    // Tester avec pagination
    const pagedObjects = await objectRepository.listByFolder(folderId, 1, 2)
    assert.lengthOf(pagedObjects, 2)
    assert.equal(pagedObjects[0].name, 'a-document.pdf')
    assert.equal(pagedObjects[1].name, 'b-document.pdf')

    // Tester la deuxième page
    const secondPageObjects = await objectRepository.listByFolder(folderId, 2, 2)
    assert.lengthOf(secondPageObjects, 1)
    assert.equal(secondPageObjects[0].name, 'c-document.pdf')
  })

  test('listByUser should retrieve objects for a specific user', async ({ assert }) => {
    const userId = 4

    // Créer des objets pour différents utilisateurs
    const user1Objects = [
      {
        userId,
        folderId: 5,
        name: 'user-document1.pdf',
        mimeType: 'application/pdf',
        hash: 'hash-u1',
        location: '/path/to/storage/user-document1.pdf',
      },
      {
        userId,
        folderId: 6,
        name: 'user-document2.pdf',
        mimeType: 'application/pdf',
        hash: 'hash-u2',
        location: '/path/to/storage/user-document2.pdf',
      },
    ]

    const differentUserObject = {
      userId: 5,
      folderId: 5,
      name: 'other-user-document.pdf',
      mimeType: 'application/pdf',
      hash: 'hash-other',
      location: '/path/to/storage/other-user-document.pdf',
    }

    // Créer les objets
    await Promise.all([
      ...user1Objects.map((data) => objectRepository.create(data as any)),
      objectRepository.create(differentUserObject as any),
    ])

    // Récupérer les objets pour l'utilisateur spécifique
    const userObjects = await objectRepository.listByUser(userId)

    // Vérifier qu'on récupère uniquement les objets de l'utilisateur
    assert.lengthOf(userObjects, 2)
    userObjects.forEach((obj) => {
      assert.equal(obj.userId, userId)
    })
  })

  test('update should modify and return an existing object', async ({ assert }) => {
    // Créer un objet
    const objectData = {
      userId: 1,
      folderId: 1,
      name: 'to-update.pdf',
      mimeType: 'application/pdf',
      hash: 'original-hash',
      location: '/path/to/storage/to-update.pdf',
    }
    const createdObject = await objectRepository.create(objectData as any)

    // Mettre à jour l'objet
    const updatedObject = await objectRepository.update(createdObject.uuid, {
      name: 'updated-name.pdf',
      hash: 'updated-hash',
    } as any)

    // Vérifier les modifications
    assert.equal(updatedObject.name, 'updated-name.pdf')
    assert.equal(updatedObject.hash, 'updated-hash')
    assert.equal(updatedObject.uuid, createdObject.uuid)
    assert.equal(updatedObject.folderId, createdObject.folderId)

    // Vérifier que l'objet est bien mis à jour dans le repository
    const retrievedObject = await objectRepository.findByUuid(createdObject.uuid)
    assert.equal(retrievedObject!.name, 'updated-name.pdf')
  })

  test('remove should delete an object', async ({ assert }) => {
    // Créer un objet
    const objectData = {
      userId: 1,
      folderId: 1,
      name: 'to-delete.pdf',
      mimeType: 'application/pdf',
      hash: 'delete-hash',
      location: '/path/to/storage/to-delete.pdf',
    }
    const createdObject = await objectRepository.create(objectData as any)

    // Vérifier que l'objet existe
    const objectBeforeDelete = await objectRepository.findByUuid(createdObject.uuid)
    assert.exists(objectBeforeDelete)

    // Supprimer l'objet
    await objectRepository.remove(createdObject.uuid)

    // Vérifier que l'objet n'existe plus
    const objectAfterDelete = await objectRepository.findByUuid(createdObject.uuid)
    assert.isNull(objectAfterDelete)
  })

  test('getRevision should return the next revision number', async ({ assert }) => {
    const folderId = 7
    const fileName = 'revision-test.pdf'

    // Créer des révisions existantes
    const objectData1 = {
      userId: 1,
      folderId,
      name: fileName,
      mimeType: 'application/pdf',
      hash: 'rev1-hash',
      location: '/path/to/storage/rev1.pdf',
      revision: 1,
    }
    const objectData2 = {
      userId: 1,
      folderId,
      name: fileName,
      mimeType: 'application/pdf',
      hash: 'rev2-hash',
      location: '/path/to/storage/rev2.pdf',
      revision: 2,
    }

    await objectRepository.create(objectData1 as any)
    await objectRepository.create(objectData2 as any)

    // Obtenir le prochain numéro de révision
    const nextRevision = await objectRepository.getRevision(folderId, fileName)

    // Vérifier que c'est bien 3
    assert.equal(nextRevision, 3)

    // Tester pour un nouveau fichier
    const newRevision = await objectRepository.getRevision(folderId, 'new-file.pdf')
    assert.equal(newRevision, 1)
  })

  test('listRevisions should retrieve all versions of a file', async ({ assert }) => {
    const folderId = 8
    const fileName = 'multiple-versions.pdf'

    // Créer plusieurs révisions du même fichier
    const revisions = []
    for (let i = 1; i <= 3; i++) {
      const objectData = {
        userId: 1,
        folderId,
        name: fileName,
        mimeType: 'application/pdf',
        hash: `hash-rev${i}`,
        location: `/path/to/storage/rev${i}.pdf`,
        revision: i,
      }
      revisions.push(await objectRepository.create(objectData as any))
    }

    // Récupérer toutes les révisions
    const allRevisions = await objectRepository.listRevisions(revisions[0].uuid)

    // Vérifier qu'on a bien toutes les révisions
    assert.lengthOf(allRevisions, 3)

    // Vérifier l'ordre (révision décroissante)
    assert.equal(allRevisions[0].revision, 3)
    assert.equal(allRevisions[1].revision, 2)
    assert.equal(allRevisions[2].revision, 1)
  })

  test('getRevisions should retrieve revisions using object ID', async ({ assert }) => {
    const folderId = 9
    const fileName = 'id-revisions.pdf'

    // Créer plusieurs révisions du même fichier
    const revisions = []
    for (let i = 1; i <= 3; i++) {
      const objectData = {
        userId: 1,
        folderId,
        name: fileName,
        mimeType: 'application/pdf',
        hash: `hash-id-rev${i}`,
        location: `/path/to/storage/id-rev${i}.pdf`,
        revision: i,
      }
      revisions.push(await objectRepository.create(objectData as any))
    }

    // Récupérer toutes les révisions par ID
    const allRevisions = await objectRepository.getRevisions(revisions[0].id)

    // Vérifier qu'on a bien toutes les révisions
    assert.lengthOf(allRevisions, 3)

    // Vérifier l'ordre (révision décroissante)
    assert.equal(allRevisions[0].revision, 3)
    assert.equal(allRevisions[1].revision, 2)
    assert.equal(allRevisions[2].revision, 1)
  })

  test('createRevision should create a new version of an existing file', async ({ assert }) => {
    // Créer un objet initial
    const originalData = {
      userId: 1,
      folderId: 10,
      name: 'original.pdf',
      mimeType: 'application/pdf',
      hash: 'hash-original',
      location: '/path/to/storage/original.pdf',
    }
    const original = await objectRepository.create(originalData as any)

    // Créer une révision
    const revisionData = {
      hash: 'hash-revision',
      location: '/path/to/storage/revision.pdf',
    }
    const revision = await objectRepository.createRevision(original.id, revisionData as any)

    // Vérifier que la révision a été créée correctement
    assert.notEqual(revision.id, original.id)
    assert.equal(revision.name, original.name)
    assert.equal(revision.folderId, original.folderId)
    assert.equal(revision.userId, original.userId)
    assert.equal(revision.hash, revisionData.hash)
    assert.equal(revision.location, revisionData.location)
    assert.equal(revision.revision, 2)

    // Vérifier qu'on peut récupérer les deux révisions
    const revisions = await objectRepository.getRevisions(revision.id)
    assert.lengthOf(revisions, 2)
  })

  test('findByMimeType should retrieve objects with a specific MIME type', async ({ assert }) => {
    // Créer des objets avec différents types MIME
    const pdfObject = {
      userId: 1,
      folderId: 11,
      name: 'document.pdf',
      mimeType: 'application/pdf',
      hash: 'hash-pdf',
      location: '/path/to/storage/document.pdf',
    }

    const jpgObject = {
      userId: 1,
      folderId: 11,
      name: 'image.jpg',
      mimeType: 'image/jpeg',
      hash: 'hash-jpg',
      location: '/path/to/storage/image.jpg',
    }

    const docxObject = {
      userId: 1,
      folderId: 11,
      name: 'document.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      hash: 'hash-docx',
      location: '/path/to/storage/document.docx',
    }

    await objectRepository.create(pdfObject as any)
    await objectRepository.create(jpgObject as any)
    await objectRepository.create(docxObject as any)

    // Rechercher par type MIME
    const pdfObjects = await objectRepository.findByMimeType('application/pdf')
    const jpgObjects = await objectRepository.findByMimeType('image/jpeg')

    // Vérifier qu'on trouve le bon nombre d'objets par type
    assert.lengthOf(pdfObjects, 1)
    assert.equal(pdfObjects[0].name, 'document.pdf')

    assert.lengthOf(jpgObjects, 1)
    assert.equal(jpgObjects[0].name, 'image.jpg')
  })
})
