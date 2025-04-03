import { test } from '@japa/runner'
import StorageService from '#services/storage_service'
import drive from '@adonisjs/drive/services/main'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import fileGenerator from '@poppinss/file-generator'
import ObjectModel from '#models/object'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import ObjectRepository from '#repositories/object_repository'
import env from '#start/env'
import app from '@adonisjs/core/services/app'

async function createMockMultipartFile() {
  const CUSTOM_TMP_DIR = join(app.tmpPath(), env.get('TEST_TMP_DIR'))
  // S'assurer que le répertoire existe
  try {
    await mkdir(CUSTOM_TMP_DIR, { recursive: true })
  } catch (error) {
    // Ignorer l'erreur si le répertoire existe déjà
  }

  // Générer un fichier PNG fictif de 1 Mo
  const file = await fileGenerator.generatePng('1mb')

  // Définir un chemin temporaire personnalisé pour le fichier
  const tmpFilePath = join(CUSTOM_TMP_DIR, file.name)

  // Écrire le fichier temporaire
  await writeFile(tmpFilePath, file.contents)

  // Créer un MultipartFile avec le chemin temporaire
  const multipartFile = new MultipartFile(
    {
      fieldName: 'file',
      clientName: file.name,
      headers: { 'content-type': 'image/png' },
    },
    {} // Options de validation (facultatif)
  )

  // Assigner manuellement le chemin temporaire
  multipartFile.tmpPath = tmpFilePath
  multipartFile.size = file.size
  multipartFile.type = 'application'
  multipartFile.subtype = 'octet-stream'

  return multipartFile
}

class FakeObjectRepository extends ObjectRepository {
  getRevision = async () => {
    return 1
  }
}

test.group('StorageService', async (group) => {
  let service: StorageService
  let fakeDisk: ReturnType<typeof drive.fake | typeof drive.use>

  group.each.setup(async () => {
    fakeDisk = drive.fake()

    service = new StorageService(new FakeObjectRepository(), fakeDisk)
  })

  group.each.teardown(() => {
    drive.restore()
  })

  test('uploadFile should upload and store a file', async ({ assert }) => {
    const buffer = Buffer.from('contenu test')
    const fileName = 'test.txt'
    const result = await service.uploadFile(buffer, fileName)

    assert.equal(result.path, `uploads/${result.hash}_${fileName}`)
    assert.isTrue(await service.fileExists(result.path))
  })

  test('deleteFile should remove a file', async ({ assert }) => {
    const buffer = Buffer.from('contenu test')
    const fileName = 'test.txt'
    const result = await service.uploadFile(buffer, fileName)

    await service.deleteFile(result.path)

    assert.isFalse(await service.fileExists(result.path))
  })

  test('getFileUrl should return a valid URL', async ({ assert }) => {
    const buffer = Buffer.from('contenu test')
    const fileName = 'test.txt'
    const result = await service.uploadFile(buffer, fileName)

    const url = await service.getFileUrl(result.path)
    assert.include(url, result.path)
  })

  test('fileExists should return true for existing file and false otherwise', async ({
    assert,
  }) => {
    const buffer = Buffer.from('contenu test')
    const fileName = 'test.txt'
    const result = await service.uploadFile(buffer, fileName)

    assert.isTrue(await service.fileExists(result.path))

    await service.deleteFile(result.path)
    assert.isFalse(await service.fileExists(result.path))
  })

  test('processUploadedFile should store file and return object model', async ({ assert }) => {
    const multipartFile = await createMockMultipartFile()

    const userId = 1
    const folderId = 1

    const result = await service.processUploadedFile(multipartFile, userId, folderId)

    assert.exists(result)
    assert.equal(result.userId, userId)
    assert.equal(result.folderId, folderId)
    assert.equal(result.name, multipartFile.clientName)
    assert.equal(result.mimeType, multipartFile.type)
    assert.exists(result.hash)
    assert.exists(result.location)

    assert.isTrue(await service.fileExists(result.location))

    assert.isTrue(await fakeDisk.exists(result.location))
  })

  test('getSignedUrl should return a signed URL', async ({ assert }) => {
    const buffer = Buffer.from('contenu test')
    const fileName = 'test.txt'
    const result = await service.uploadFile(buffer, fileName)

    const signedUrl = await service.getSignedUrl(result.path, 120)
    assert.isString(signedUrl)
    assert.include(signedUrl, result.path)
  })
})
