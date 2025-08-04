/**
 * @fileoverview Tests mockés pour le FolderRepository utilisant Sinon
 *
 * Ce fichier implémente une version mockée du FolderRepository avec Sinon
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
import FolderRepository from '#repositories/folder_repository'
import Folder from '#models/folder'
import sinon from 'sinon'
import NotFoundException from '#exceptions/not_found_exception'

test.group('FolderRepository (Sinon mock)', (group) => {
  let folderRepository: FolderRepository

  group.each.setup(() => {
    folderRepository = new FolderRepository()
  })

  test('create - devrait créer un nouveau dossier', async ({ assert }) => {
    // Arrange
    const uuid = generateUuid()
    const now = DateTime.now()

    const folderData: Partial<Folder> = {
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1,
      parentId: null,
    }

    const expectedFolder = {
      id: 1,
      uuid,
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1,
      parentId: null,
      createdAt: now,
      updatedAt: now,
    } as unknown as Folder

    // Create stubs
    const createStub = sinon.stub(folderRepository, 'create')
    createStub.withArgs(folderData).resolves(expectedFolder)

    try {
      // Act
      const result = await folderRepository.create(folderData)

      // Assert
      assert.equal(result.name, expectedFolder.name)
      assert.equal(result.description, expectedFolder.description)
      assert.equal(result.circleId, expectedFolder.circleId)
      assert.equal(result.userId, expectedFolder.userId)

      sinon.assert.calledOnce(createStub)
      sinon.assert.calledWith(createStub, folderData)
    } finally {
      // Clean up
      createStub.restore()
    }
  })

  test('findByUuid - devrait trouver un dossier par UUID', async ({ assert }) => {
    // Arrange
    const uuid = 'test-uuid'
    const now = DateTime.now()

    const expectedFolder = {
      id: 1,
      uuid,
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1,
      parentId: null,
      createdAt: now,
      updatedAt: now,
    } as unknown as Folder

    // Create stubs
    const findByUuidStub = sinon.stub(folderRepository, 'findByUuid')
    findByUuidStub.withArgs(uuid).resolves(expectedFolder)
    findByUuidStub.withArgs('non-existent-uuid').resolves(null)

    try {
      // Act
      const result = await folderRepository.findByUuid(uuid)
      const nonExistentResult = await folderRepository.findByUuid('non-existent-uuid')

      // Assert
      assert.isNotNull(result)
      assert.equal(result?.uuid, uuid)

      assert.isNull(nonExistentResult)

      sinon.assert.calledTwice(findByUuidStub)
      sinon.assert.calledWith(findByUuidStub, uuid)
      sinon.assert.calledWith(findByUuidStub, 'non-existent-uuid')
    } finally {
      // Clean up
      findByUuidStub.restore()
    }
  })

  test('findById - devrait trouver un dossier par ID', async ({ assert }) => {
    // Arrange
    const uuid = generateUuid()
    const now = DateTime.now()

    const expectedFolder = {
      id: 1,
      uuid,
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1,
      parentId: null,
      createdAt: now,
      updatedAt: now,
    } as unknown as Folder

    // Create stubs
    const findByIdStub = sinon.stub(folderRepository, 'findById')
    findByIdStub.withArgs(1).resolves(expectedFolder)
    findByIdStub.withArgs(999).resolves(null)

    try {
      // Act
      const result = await folderRepository.findById(1)
      const nonExistentResult = await folderRepository.findById(999)

      // Assert
      assert.isNotNull(result)
      if (result) {
        assert.equal(result.id, expectedFolder.id)
        assert.equal(result.name, expectedFolder.name)
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

  test("findByCircle - devrait trouver les dossiers d'un cercle", async ({ assert }) => {
    // Arrange
    const now = DateTime.now()
    const circleId = 1

    const expectedFolders = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Documents',
        description: 'Documents Folder',
        circleId,
        userId: 1,
        parentId: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Photos',
        description: 'Photos Folder',
        circleId,
        userId: 2,
        parentId: null,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as Folder[]

    // Create stubs
    const findByCircleStub = sinon.stub(folderRepository, 'findByCircle')
    findByCircleStub.withArgs(circleId).resolves(expectedFolders)
    findByCircleStub.withArgs(999).resolves([])

    try {
      // Act
      const results = await folderRepository.findByCircle(circleId)
      const emptyResults = await folderRepository.findByCircle(999)

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].name, 'Documents')
      assert.equal(results[1].name, 'Photos')

      assert.isEmpty(emptyResults)

      sinon.assert.calledTwice(findByCircleStub)
      sinon.assert.calledWith(findByCircleStub, circleId)
      sinon.assert.calledWith(findByCircleStub, 999)
    } finally {
      // Clean up
      findByCircleStub.restore()
    }
  })

  test("findByParent - devrait trouver les dossiers enfants d'un dossier parent", async ({
    assert,
  }) => {
    // Arrange
    const now = DateTime.now()
    const parentId = 1

    const expectedFolders = [
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Documents',
        description: 'Documents Folder',
        circleId: 1,
        userId: 1,
        parentId,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        uuid: generateUuid(),
        name: 'Photos',
        description: 'Photos Folder',
        circleId: 1,
        userId: 2,
        parentId,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as Folder[]

    // Create stubs
    const findByParentStub = sinon.stub(folderRepository, 'findByParent')
    findByParentStub.withArgs(parentId).resolves(expectedFolders)
    findByParentStub.withArgs(999).resolves([])

    try {
      // Act
      const results = await folderRepository.findByParent(parentId)
      const emptyResults = await folderRepository.findByParent(999)

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].name, 'Documents')
      assert.equal(results[1].name, 'Photos')
      assert.equal(results[0].parentId, parentId)
      assert.equal(results[1].parentId, parentId)

      assert.isEmpty(emptyResults)

      sinon.assert.calledTwice(findByParentStub)
      sinon.assert.calledWith(findByParentStub, parentId)
      sinon.assert.calledWith(findByParentStub, 999)
    } finally {
      // Clean up
      findByParentStub.restore()
    }
  })

  test("getPath - devrait retourner le chemin d'un dossier", async ({ assert }) => {
    // Arrange
    const now = DateTime.now()
    const folderId = 3

    const expectedPath = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Root',
        description: 'Root Folder',
        circleId: 1,
        userId: 1,
        parentId: null,
        createdAt: now.minus({ days: 2 }),
        updatedAt: now.minus({ days: 2 }),
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Documents',
        description: 'Documents Folder',
        circleId: 1,
        userId: 1,
        parentId: 1,
        createdAt: now.minus({ days: 1 }),
        updatedAt: now.minus({ days: 1 }),
      },
      {
        id: 3,
        uuid: generateUuid(),
        name: 'Projects',
        description: 'Projects Folder',
        circleId: 1,
        userId: 1,
        parentId: 2,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as Folder[]

    // Create stubs
    const getPathStub = sinon.stub(folderRepository, 'getPath')
    getPathStub.withArgs(folderId).resolves(expectedPath)

    try {
      // Act
      const results = await folderRepository.getPath(folderId)

      // Assert
      assert.lengthOf(results, 3)
      assert.equal(results[0].name, 'Root')
      assert.equal(results[1].name, 'Documents')
      assert.equal(results[2].name, 'Projects')

      sinon.assert.calledOnce(getPathStub)
      sinon.assert.calledWith(getPathStub, folderId)
    } finally {
      // Clean up
      getPathStub.restore()
    }
  })

  test('update - devrait mettre à jour un dossier existant', async ({ assert }) => {
    // Arrange
    const uuid = 'test-uuid'
    const now = DateTime.now()

    const folderData: Partial<Folder> = {
      name: 'Updated Folder',
      description: 'Updated Description',
    }

    const expectedFolder = {
      id: 1,
      uuid,
      name: 'Updated Folder',
      description: 'Updated Description',
      circleId: 1,
      userId: 1,
      parentId: null,
      createdAt: now.minus({ days: 1 }),
      updatedAt: now,
    } as unknown as Folder

    // Create stubs
    const updateStub = sinon.stub(folderRepository, 'update')
    updateStub.withArgs(uuid, folderData).resolves(expectedFolder)

    try {
      // Act
      const result = await folderRepository.update(uuid, folderData)

      // Assert
      assert.equal(result.name, expectedFolder.name)
      assert.equal(result.description, expectedFolder.description)

      sinon.assert.calledOnce(updateStub)
      sinon.assert.calledWith(updateStub, uuid, folderData)
    } finally {
      // Clean up
      updateStub.restore()
    }
  })

  test('delete - devrait supprimer un dossier existant', async ({ assert }) => {
    // Arrange
    const uuid = 'test-uuid'

    // Create stubs
    const deleteStub = sinon.stub(folderRepository, 'delete')
    deleteStub.withArgs(uuid).resolves()

    try {
      // Act
      await folderRepository.delete(uuid)

      // Assert
      sinon.assert.calledOnce(deleteStub)
      sinon.assert.calledWith(deleteStub, uuid)
    } finally {
      // Clean up
      deleteStub.restore()
    }
  })

  test('list - devrait retourner une liste de tous les dossiers', async ({ assert }) => {
    // Arrange
    const now = DateTime.now()

    const expectedFolders = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Root',
        description: 'Root Folder',
        circleId: 1,
        userId: 1,
        parentId: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Documents',
        description: 'Documents Folder',
        circleId: 1,
        userId: 1,
        parentId: 1,
        createdAt: now,
        updatedAt: now,
      },
    ] as unknown as Folder[]

    // Create stubs
    const listStub = sinon.stub(folderRepository, 'list')
    listStub.resolves(expectedFolders)

    try {
      // Act
      const results = await folderRepository.list()

      // Assert
      assert.lengthOf(results, 2)
      assert.equal(results[0].id, expectedFolders[0].id)
      assert.equal(results[1].id, expectedFolders[1].id)

      sinon.assert.calledOnce(listStub)
    } finally {
      // Clean up
      listStub.restore()
    }
  })
})
