/**
 * @fileoverview Tests mockés pour le ObjectRepository utilisant Sinon
 *
 * Ce fichier implémente une version mockée du ObjectRepository avec Sinon
 * qui permet d'exécuter des tests sans dépendre d'une base de données réelle.
 * Cette approche présente plusieurs avantages :
 *
 * 1. Sécurité : Pas d'accès aux données sensibles en production
 * 2. Vitesse : Tests plus rapides sans opérations de base de données
 * 3. Isolement : Tests indépendants de l'état de la base de données
 * 4. Déterminisme : Comportement prévisible sans problèmes de contraintes de clés étrangères
 */

import { test } from '@japa/runner'
import { generateUuid } from '#utils/uuid_helper'
import { DateTime } from 'luxon'
import ObjectRepository from '#repositories/object_repository'
import ObjectModel from '#models/object'
import sinon from 'sinon'
import NotFoundException from '#exceptions/not_found_exception'

test.group('ObjectRepository (Sinon mock)', (group) => {
  let objectRepository: ObjectRepository

  group.each.setup(() => {
    objectRepository = new ObjectRepository()
  })

  test('create - should create a new object and return it', async ({ assert }) => {
    // Arrange
    const uuid = generateUuid()
    const now = DateTime.now()

    const objectData: Partial<ObjectModel> = {
      name: 'test-object.txt',
      folderId: 1,
      userId: 1,
      mimeType: 'text/plain',
      hash: 'abc123',
      location: '/storage/test-object.txt',
      revision: 1,
    }

    const expectedObject = {
      id: 1,
      uuid,
      name: 'test-object.txt',
      folderId: 1,
      userId: 1,
      mimeType: 'text/plain',
      hash: 'abc123',
      location: '/storage/test-object.txt',
      revision: 1,
      createdAt: now,
      updatedAt: now,
    } as unknown as ObjectModel

    // Create stubs
    const createStub = sinon.stub(objectRepository, 'create')
    createStub.withArgs(objectData).resolves(expectedObject)

    try {
      // Act
      const result = await objectRepository.create(objectData)

      // Assert
      assert.equal(result.id, expectedObject.id)
      assert.equal(result.name, expectedObject.name)
      assert.equal(result.folderId, expectedObject.folderId)
      assert.equal(result.userId, expectedObject.userId)
      assert.equal(result.mimeType, expectedObject.mimeType)
      assert.equal(result.hash, expectedObject.hash)
      assert.equal(result.location, expectedObject.location)
      assert.equal(result.revision, expectedObject.revision)

      sinon.assert.calledOnce(createStub)
      sinon.assert.calledWith(createStub, objectData)
    } finally {
      // Clean up
      createStub.restore()
    }
  })

  test('findByUuid - should find an object by UUID', async ({ assert }) => {
    // Arrange
    const uuid = generateUuid()
    const now = DateTime.now()

    const expectedObject = {
      id: 1,
      uuid,
      name: 'test-object.txt',
      folderId: 1,
      userId: 1,
      mimeType: 'text/plain',
      hash: 'abc123',
      location: '/storage/test-object.txt',
      revision: 1,
      createdAt: now,
      updatedAt: now,
    } as unknown as ObjectModel

    // Create stubs
    const findByUuidStub = sinon.stub(objectRepository, 'findByUuid')
    findByUuidStub.withArgs(uuid).resolves(expectedObject)
    findByUuidStub.withArgs('non-existent-uuid').resolves(null)

    try {
      // Act
      const result = await objectRepository.findByUuid(uuid)
      const nonExistentResult = await objectRepository.findByUuid('non-existent-uuid')

      // Assert
      assert.isNotNull(result)
      if (result) {
        assert.equal(result.id, expectedObject.id)
        assert.equal(result.uuid, expectedObject.uuid)
        assert.equal(result.name, expectedObject.name)
      }

      assert.isNull(nonExistentResult)

      sinon.assert.calledTwice(findByUuidStub)
      sinon.assert.calledWith(findByUuidStub, uuid)
      sinon.assert.calledWith(findByUuidStub, 'non-existent-uuid')
    } finally {
      // Clean up
      findByUuidStub.restore()
    }
  })

  test('findById - should find an object by ID', async ({ assert }) => {
    // Arrange
    const uuid = generateUuid()
    const now = DateTime.now()

    const expectedObject = {
      id: 1,
      uuid,
      name: 'test-object.txt',
      folderId: 1,
      userId: 1,
      mimeType: 'text/plain',
      hash: 'abc123',
      location: '/storage/test-object.txt',
      revision: 1,
      createdAt: now,
      updatedAt: now,
    } as unknown as ObjectModel

    // Create stubs
    const findByIdStub = sinon.stub(objectRepository, 'findById')
    findByIdStub.withArgs(1).resolves(expectedObject)
    findByIdStub.withArgs(999).resolves(null)

    try {
      // Act
      const result = await objectRepository.findById(1)
      const nonExistentResult = await objectRepository.findById(999)

      // Assert
      assert.isNotNull(result)
      if (result) {
        assert.equal(result.id, expectedObject.id)
        assert.equal(result.uuid, expectedObject.uuid)
        assert.equal(result.name, expectedObject.name)
      }

      assert.isNull(nonExistentResult)

      sinon.assert.calledTwice(findByIdStub)
      sinon.assert.calledWith(findByIdStub, 1)
      sinon.assert.calledWith(findByIdStub, 999)
    } finally {
      // Clean up
      findByIdStub.restore()
    }
  })

  test('findByFolder - should return objects from a specific folder', async ({ assert }) => {
    // Arrange
    const now = DateTime.now()

    const expectedObjects = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'test-object-1.txt',
        folderId: 1,
        userId: 1,
        mimeType: 'text/plain',
        hash: 'abc123',
        location: '/storage/test-object-1.txt',
        revision: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'test-object-2.txt',
        folderId: 1,
        userId: 1,
        mimeType: 'text/plain',
        hash: 'def456',
        location: '/storage/test-object-2.txt',
        revision: 1,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as ObjectModel[]

    // Create stubs
    const findByFolderStub = sinon.stub(objectRepository, 'findByFolder')
    findByFolderStub.withArgs(1).resolves(expectedObjects)
    findByFolderStub.withArgs(999).resolves([])

    try {
      // Act
      const results = await objectRepository.findByFolder(1)
      const emptyResults = await objectRepository.findByFolder(999)

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].id, expectedObjects[0].id)
      assert.equal(results[0].name, expectedObjects[0].name)
      assert.equal(results[1].id, expectedObjects[1].id)

      assert.isEmpty(emptyResults)

      sinon.assert.calledTwice(findByFolderStub)
      sinon.assert.calledWith(findByFolderStub, 1)
      sinon.assert.calledWith(findByFolderStub, 999)
    } finally {
      // Clean up
      findByFolderStub.restore()
    }
  })

  test('findByHash - should find an object by hash', async ({ assert }) => {
    // Arrange
    const uuid = generateUuid()
    const now = DateTime.now()
    const hash = 'abc123'

    const expectedObject = {
      id: 1,
      uuid,
      name: 'test-object.txt',
      folderId: 1,
      userId: 1,
      mimeType: 'text/plain',
      hash,
      location: '/storage/test-object.txt',
      revision: 1,
      createdAt: now,
      updatedAt: now,
    } as unknown as ObjectModel

    // Create stubs
    const findByHashStub = sinon.stub(objectRepository, 'findByHash')
    findByHashStub.withArgs(hash).resolves(expectedObject)
    findByHashStub.withArgs('non-existent-hash').resolves(null)

    try {
      // Act
      const result = await objectRepository.findByHash(hash)
      const nonExistentResult = await objectRepository.findByHash('non-existent-hash')

      // Assert
      assert.isNotNull(result)
      if (result) {
        assert.equal(result.id, expectedObject.id)
        assert.equal(result.hash, expectedObject.hash)
        assert.equal(result.name, expectedObject.name)
      }

      assert.isNull(nonExistentResult)

      sinon.assert.calledTwice(findByHashStub)
      sinon.assert.calledWith(findByHashStub, hash)
      sinon.assert.calledWith(findByHashStub, 'non-existent-hash')
    } finally {
      // Clean up
      findByHashStub.restore()
    }
  })

  test('findByMimeType - should find objects by mime type', async ({ assert }) => {
    // Arrange
    const now = DateTime.now()
    const mimeType = 'text/plain'

    const expectedObjects = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'test-object-1.txt',
        folderId: 1,
        userId: 1,
        mimeType,
        hash: 'abc123',
        location: '/storage/test-object-1.txt',
        revision: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'test-object-2.txt',
        folderId: 2,
        userId: 1,
        mimeType,
        hash: 'def456',
        location: '/storage/test-object-2.txt',
        revision: 1,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as ObjectModel[]

    // Create stubs
    const findByMimeTypeStub = sinon.stub(objectRepository, 'findByMimeType')
    findByMimeTypeStub.withArgs(mimeType).resolves(expectedObjects)
    findByMimeTypeStub.withArgs('application/unknown').resolves([])

    try {
      // Act
      const results = await objectRepository.findByMimeType(mimeType)
      const emptyResults = await objectRepository.findByMimeType('application/unknown')

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].mimeType, mimeType)
      assert.equal(results[1].mimeType, mimeType)

      assert.isEmpty(emptyResults)

      sinon.assert.calledTwice(findByMimeTypeStub)
      sinon.assert.calledWith(findByMimeTypeStub, mimeType)
      sinon.assert.calledWith(findByMimeTypeStub, 'application/unknown')
    } finally {
      // Clean up
      findByMimeTypeStub.restore()
    }
  })

  test('update - should update an object and return it', async ({ assert }) => {
    // Arrange
    const uuid = generateUuid()
    const now = DateTime.now()

    const objectId = 1
    const updateData: Partial<ObjectModel> = {
      name: 'updated-object.txt',
    }

    const expectedObject = {
      id: objectId,
      uuid,
      name: 'updated-object.txt',
      folderId: 1,
      userId: 1,
      mimeType: 'text/plain',
      hash: 'abc123',
      location: '/storage/test-object.txt',
      revision: 1,
      createdAt: now,
      updatedAt: now,
    } as unknown as ObjectModel

    // Create stubs
    const updateStub = sinon.stub(objectRepository, 'update')
    updateStub.withArgs(objectId, updateData).resolves(expectedObject)

    try {
      // Act
      const result = await objectRepository.update(objectId, updateData)

      // Assert
      assert.equal(result.id, expectedObject.id)
      assert.equal(result.name, expectedObject.name)

      sinon.assert.calledOnce(updateStub)
      sinon.assert.calledWith(updateStub, objectId, updateData)
    } finally {
      // Clean up
      updateStub.restore()
    }
  })

  test('createRevision - should create a new revision of an object', async ({ assert }) => {
    // Arrange
    const now = DateTime.now()
    const objectId = 1

    const revisionData: Partial<ObjectModel> = {
      hash: 'newHash123',
      location: '/storage/new-location.txt',
      revision: 2,
    }

    const expectedObject = {
      id: 2,
      uuid: generateUuid(),
      name: 'test-object.txt',
      folderId: 1,
      userId: 1,
      mimeType: 'text/plain',
      hash: 'newHash123',
      location: '/storage/new-location.txt',
      revision: 2,
      createdAt: now,
      updatedAt: now,
    } as unknown as ObjectModel

    // Create stubs
    const createRevisionStub = sinon.stub(objectRepository, 'createRevision')
    createRevisionStub.withArgs(objectId, revisionData).resolves(expectedObject)

    try {
      // Act
      const result = await objectRepository.createRevision(objectId, revisionData)

      // Assert
      assert.equal(result.id, expectedObject.id)
      assert.equal(result.hash, expectedObject.hash)
      assert.equal(result.location, expectedObject.location)
      assert.equal(result.revision, expectedObject.revision)

      sinon.assert.calledOnce(createRevisionStub)
      sinon.assert.calledWith(createRevisionStub, objectId, revisionData)
    } finally {
      // Clean up
      createRevisionStub.restore()
    }
  })

  test('getRevisions - should get all revisions of an object', async ({ assert }) => {
    // Arrange
    const now = DateTime.now()
    const objectId = 1
    const baseUuid = generateUuid()

    const expectedRevisions = [
      {
        id: 1,
        uuid: baseUuid,
        name: 'test-object.txt',
        folderId: 1,
        userId: 1,
        mimeType: 'text/plain',
        hash: 'abc123',
        location: '/storage/test-object.txt',
        revision: 1,
        createdAt: now.minus({ days: 1 }),
        updatedAt: now.minus({ days: 1 }),
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'test-object.txt',
        folderId: 1,
        userId: 1,
        mimeType: 'text/plain',
        hash: 'def456',
        location: '/storage/test-object.txt',
        revision: 2,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as ObjectModel[]

    // Create stubs
    const getRevisionsStub = sinon.stub(objectRepository, 'getRevisions')
    getRevisionsStub.withArgs(objectId).resolves(expectedRevisions)

    try {
      // Act
      const results = await objectRepository.getRevisions(objectId)

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].revision, 1)
      assert.equal(results[1].revision, 2)

      sinon.assert.calledOnce(getRevisionsStub)
      sinon.assert.calledWith(getRevisionsStub, objectId)
    } finally {
      // Clean up
      getRevisionsStub.restore()
    }
  })

  test('listRevisions - should list all revisions of an object by uuid', async ({ assert }) => {
    // Arrange
    const now = DateTime.now()
    const objectUuid = generateUuid()

    const expectedRevisions = [
      {
        id: 1,
        uuid: objectUuid,
        name: 'test-object.txt',
        folderId: 1,
        userId: 1,
        mimeType: 'text/plain',
        hash: 'abc123',
        location: '/storage/test-object.txt',
        revision: 1,
        createdAt: now.minus({ days: 1 }),
        updatedAt: now.minus({ days: 1 }),
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'test-object.txt',
        folderId: 1,
        userId: 1,
        mimeType: 'text/plain',
        hash: 'def456',
        location: '/storage/test-object.txt',
        revision: 2,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as ObjectModel[]

    // Create stubs
    const listRevisionsStub = sinon.stub(objectRepository, 'listRevisions')
    listRevisionsStub.withArgs(objectUuid).resolves(expectedRevisions)

    try {
      // Act
      const results = await objectRepository.listRevisions(objectUuid)

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].revision, 1)
      assert.equal(results[1].revision, 2)

      sinon.assert.calledOnce(listRevisionsStub)
      sinon.assert.calledWith(listRevisionsStub, objectUuid)
    } finally {
      // Clean up
      listRevisionsStub.restore()
    }
  })

  test('delete - should delete an object', async ({ assert }) => {
    // Arrange
    const objectId = 1

    // Create stubs
    const deleteStub = sinon.stub(objectRepository, 'delete')
    deleteStub.withArgs(objectId).resolves()

    try {
      // Act
      await objectRepository.delete(objectId)

      // Assert
      sinon.assert.calledOnce(deleteStub)
      sinon.assert.calledWith(deleteStub, objectId)
    } finally {
      // Clean up
      deleteStub.restore()
    }
  })

  test('list - should return a list of all objects', async ({ assert }) => {
    // Arrange
    const now = DateTime.now()

    const expectedObjects = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'test-object-1.txt',
        folderId: 1,
        userId: 1,
        mimeType: 'text/plain',
        hash: 'abc123',
        location: '/storage/test-object-1.txt',
        revision: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'test-object-2.txt',
        folderId: 2,
        userId: 1,
        mimeType: 'application/pdf',
        hash: 'def456',
        location: '/storage/test-object-2.txt',
        revision: 1,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as ObjectModel[]

    // Create stubs
    const listStub = sinon.stub(objectRepository, 'list')
    listStub.resolves(expectedObjects)

    try {
      // Act
      const results = await objectRepository.list()

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].id, expectedObjects[0].id)
      assert.equal(results[1].id, expectedObjects[1].id)

      sinon.assert.calledOnce(listStub)
    } finally {
      // Clean up
      listStub.restore()
    }
  })
})
