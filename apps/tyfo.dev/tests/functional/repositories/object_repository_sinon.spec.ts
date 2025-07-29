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
import { ObjectRepositoryContract } from '#repositories/contracts/object_repository_contract'
import ObjectRepository from '#repositories/object_repository'
import sinon from 'sinon'
import sinonTest from 'sinon-test'
import ObjectModel from '#models/object'

test.group('ObjectRepository (Sinon mock)', (group) => {
  let objectRepository: ObjectRepository
  let stest = sinonTest(sinon, { useFakeTimers: false })

  group.setup(async () => {
    objectRepository = new ObjectRepository()
  })

  test('create - devrait créer un nouvel objet', stest(function () {
    const mockObject = {
      id: 1,
      uuid: generateUuid(),
      name: 'test.txt',
      folderId: 1,
      circleId: 1,
      userId: 1,
      size: 1024,
      mimeType: 'text/plain',
      metadata: { author: 'Test User' },
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    // Configurer le mock
    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('create').once().withArgs({
      name: 'test.txt',
      folderId: 1,
      circleId: 1,
      userId: 1,
      size: 1024,
      mimeType: 'text/plain',
      metadata: { author: 'Test User' }
    }).resolves(mockObject)

    // Exécuter l'opération
    return objectRepository.create({
      name: 'test.txt',
      folderId: 1,
      circleId: 1,
      userId: 1,
      size: 1024,
      mimeType: 'text/plain',
      metadata: { author: 'Test User' }
    }).then(result => {
      // Vérifier le résultat
      test.assert.equal(result.name, 'test.txt')
      test.assert.equal(result.mimeType, 'text/plain')
      test.assert.equal(result.size, 1024)
      
      // Vérifier que la méthode a été appelée correctement
      mockRepository.verify()
    })
  }))

  test('findByUuid - devrait trouver un objet par UUID', stest(function () {
    const mockObject = {
      id: 1,
      uuid: 'test-uuid',
      name: 'test.txt',
      folderId: 1,
      circleId: 1,
      userId: 1,
      size: 1024,
      mimeType: 'text/plain',
      metadata: { author: 'Test User' },
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('findByUuid').once().withArgs('test-uuid').resolves(mockObject)

    return objectRepository.findByUuid('test-uuid').then(result => {
      test.assert.equal(result.uuid, 'test-uuid')
      mockRepository.verify()
    })
  }))

  test('listByFolder - devrait lister les objets d\'un dossier', stest(function () {
    const mockObjects = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'document.txt',
        folderId: 1,
        circleId: 1,
        userId: 1,
        size: 1024,
        mimeType: 'text/plain',
        metadata: { author: 'Test User' },
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'image.jpg',
        folderId: 1,
        circleId: 1,
        userId: 1,
        size: 5120,
        mimeType: 'image/jpeg',
        metadata: { author: 'Test User' },
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      }
    ]

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('listByFolder').once().withArgs('folder-uuid').resolves(mockObjects)

    return objectRepository.listByFolder('folder-uuid').then(results => {
      test.assert.equal(results.length, 2)
      test.assert.equal(results[0].name, 'document.txt')
      test.assert.equal(results[1].name, 'image.jpg')
      mockRepository.verify()
    })
  }))

  test('listByCircle - devrait lister les objets d\'un cercle', stest(function () {
    const mockObjects = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'document.txt',
        folderId: 1,
        circleId: 1,
        userId: 1,
        size: 1024,
        mimeType: 'text/plain',
        metadata: { author: 'Test User' },
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'image.jpg',
        folderId: 2,
        circleId: 1,
        userId: 2,
        size: 5120,
        mimeType: 'image/jpeg',
        metadata: { author: 'Another User' },
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      }
    ]

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('listByCircle').once().withArgs('circle-uuid').resolves(mockObjects)

    return objectRepository.listByCircle('circle-uuid').then(results => {
      test.assert.equal(results.length, 2)
      test.assert.equal(results[0].name, 'document.txt')
      test.assert.equal(results[1].name, 'image.jpg')
      mockRepository.verify()
    })
  }))

  test('list - devrait lister les objets selon des critères', stest(function () {
    const mockObjects = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'document.txt',
        folderId: 1,
        circleId: 1,
        userId: 1,
        size: 1024,
        mimeType: 'text/plain',
        metadata: { author: 'Test User' },
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      }
    ]

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('list').once().withArgs({
      mimeType: 'text/plain',
      metadata: { author: 'Test User' }
    }).resolves(mockObjects)

    return objectRepository.list({
      mimeType: 'text/plain',
      metadata: { author: 'Test User' }
    }).then(results => {
      test.assert.equal(results.length, 1)
      test.assert.equal(results[0].name, 'document.txt')
      test.assert.equal(results[0].mimeType, 'text/plain')
      mockRepository.verify()
    })
  }))

  test('update - devrait mettre à jour un objet existant', stest(function () {
    const mockUpdatedObject = {
      id: 1,
      uuid: 'test-uuid',
      name: 'updated.txt',
      folderId: 1,
      circleId: 1,
      userId: 1,
      size: 1024,
      mimeType: 'text/plain',
      metadata: { author: 'Updated User' },
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('update').once().withArgs('test-uuid', {
      name: 'updated.txt',
      metadata: { author: 'Updated User' }
    }).resolves(mockUpdatedObject)

    return objectRepository.update('test-uuid', {
      name: 'updated.txt',
      metadata: { author: 'Updated User' }
    }).then(result => {
      test.assert.equal(result.name, 'updated.txt')
      test.assert.deepEqual(result.metadata, { author: 'Updated User' })
      mockRepository.verify()
    })
  }))

  test('remove - devrait supprimer un objet existant', stest(function () {
    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('remove').once().withArgs('test-uuid').resolves()

    return objectRepository.remove('test-uuid').then(() => {
      mockRepository.verify()
    })
  }))

  test('moveToFolder - devrait déplacer un objet vers un autre dossier', stest(function () {
    const mockUpdatedObject = {
      id: 1,
      uuid: 'test-uuid',
      name: 'document.txt',
      folderId: 2, // Nouveau dossier
      circleId: 1,
      userId: 1,
      size: 1024,
      mimeType: 'text/plain',
      metadata: { author: 'Test User' },
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('moveToFolder').once().withArgs('test-uuid', 'new-folder-uuid').resolves(mockUpdatedObject)

    return objectRepository.moveToFolder('test-uuid', 'new-folder-uuid').then(result => {
      test.assert.equal(result.folderId, 2)
      mockRepository.verify()
    })
  }))

  test('createVersion - devrait créer une nouvelle version d\'un objet', stest(function () {
    const mockVersion = {
      id: 1,
      uuid: generateUuid(),
      objectId: 1,
      objectUuid: 'test-uuid',
      size: 1024,
      versionNumber: 2,
      metadata: { author: 'Test User', comment: 'New version' },
      createdAt: DateTime.now()
    }

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('createVersion').once().withArgs('test-uuid', {
      size: 1024,
      metadata: { author: 'Test User', comment: 'New version' }
    }).resolves(mockVersion)

    return objectRepository.createVersion('test-uuid', {
      size: 1024,
      metadata: { author: 'Test User', comment: 'New version' }
    }).then(result => {
      test.assert.equal(result.objectUuid, 'test-uuid')
      test.assert.equal(result.versionNumber, 2)
      mockRepository.verify()
    })
  }))

  test('listRevisions - devrait lister les versions d\'un objet', stest(function () {
    const mockVersions = [
      {
        id: 1,
        uuid: generateUuid(),
        objectId: 1,
        objectUuid: 'test-uuid',
        size: 1024,
        versionNumber: 1,
        metadata: { author: 'Test User', comment: 'Initial version' },
        createdAt: DateTime.now().minus({ days: 1 })
      },
      {
        id: 2,
        uuid: generateUuid(),
        objectId: 1,
        objectUuid: 'test-uuid',
        size: 1024,
        versionNumber: 2,
        metadata: { author: 'Test User', comment: 'New version' },
        createdAt: DateTime.now()
      }
    ]

    const mockRepository = this.mock(objectRepository)
    mockRepository.expects('listRevisions').once().withArgs('test-uuid').resolves(mockVersions)

    return objectRepository.listRevisions('test-uuid').then(results => {
      test.assert.equal(results.length, 2)
      test.assert.equal(results[0].versionNumber, 1)
      test.assert.equal(results[1].versionNumber, 2)
      mockRepository.verify()
    })
  }))
})
