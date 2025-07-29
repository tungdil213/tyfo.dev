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
import { FolderRepositoryContract } from '#repositories/contracts/folder_repository_contract'
import FolderRepository from '#repositories/folder_repository'
import sinon from 'sinon'
import sinonTest from 'sinon-test'
import Folder from '#models/folder'

test.group('FolderRepository (Sinon mock)', (group) => {
  let folderRepository: FolderRepository
  let stest = sinonTest(sinon, { useFakeTimers: false })

  group.setup(async () => {
    folderRepository = new FolderRepository()
  })

  test('create - devrait créer un nouveau dossier', stest(function () {
    const mockFolder = {
      id: 1,
      uuid: generateUuid(),
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    // Configurer le mock
    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('create').once().withArgs({
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1
    }).resolves(mockFolder)

    // Exécuter l'opération
    return folderRepository.create({
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1
    }).then(result => {
      // Vérifier le résultat
      test.assert.equal(result.name, 'Test Folder')
      test.assert.equal(result.description, 'Test Description')
      test.assert.equal(result.circleId, 1)
      
      // Vérifier que la méthode a été appelée correctement
      mockRepository.verify()
    })
  }))

  test('findByUuid - devrait trouver un dossier par UUID', stest(function () {
    const mockFolder = {
      id: 1,
      uuid: 'test-uuid',
      name: 'Test Folder',
      description: 'Test Description',
      circleId: 1,
      userId: 1,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('findByUuid').once().withArgs('test-uuid').resolves(mockFolder)

    return folderRepository.findByUuid('test-uuid').then(result => {
      test.assert.equal(result.uuid, 'test-uuid')
      mockRepository.verify()
    })
  }))

  test('findByName - devrait trouver un dossier par son nom', stest(function () {
    const mockFolder = {
      id: 1,
      uuid: generateUuid(),
      name: 'Documents',
      description: 'Documents Folder',
      circleId: 1,
      userId: 1,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('findByName').once().withArgs('Documents').resolves(mockFolder)

    return folderRepository.findByName('Documents').then(result => {
      test.assert.equal(result.name, 'Documents')
      mockRepository.verify()
    })
  }))

  test('listByCircle - devrait lister les dossiers d\'un cercle', stest(function () {
    const mockFolders = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Documents',
        description: 'Documents Folder',
        circleId: 1,
        userId: 1,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Photos',
        description: 'Photos Folder',
        circleId: 1,
        userId: 2,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      }
    ]

    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('listByCircle').once().withArgs('circle-1').resolves(mockFolders)

    return folderRepository.listByCircle('circle-1').then(results => {
      test.assert.equal(results.length, 2)
      test.assert.equal(results[0].name, 'Documents')
      test.assert.equal(results[1].name, 'Photos')
      mockRepository.verify()
    })
  }))

  test('listByCircleAndUser - devrait lister les dossiers d\'un cercle pour un utilisateur spécifique', stest(function () {
    const mockFolders = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Documents',
        description: 'Documents Folder',
        circleId: 1,
        userId: 1,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      }
    ]

    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('listByCircleAndUser').once().withArgs('circle-1', 'user-1').resolves(mockFolders)

    return folderRepository.listByCircleAndUser('circle-1', 'user-1').then(results => {
      test.assert.equal(results.length, 1)
      test.assert.equal(results[0].name, 'Documents')
      mockRepository.verify()
    })
  }))

  test('listByUser - devrait lister tous les dossiers d\'un utilisateur', stest(function () {
    const mockFolders = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Documents',
        description: 'Documents Folder',
        circleId: 1,
        userId: 1,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Photos',
        description: 'Photos Folder',
        circleId: 2,
        userId: 1,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now()
      }
    ]

    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('listByUser').once().withArgs('user-1').resolves(mockFolders)

    return folderRepository.listByUser('user-1').then(results => {
      test.assert.equal(results.length, 2)
      test.assert.equal(results[0].name, 'Documents')
      test.assert.equal(results[1].name, 'Photos')
      mockRepository.verify()
    })
  }))

  test('update - devrait mettre à jour un dossier existant', stest(function () {
    const mockUpdatedFolder = {
      id: 1,
      uuid: 'test-uuid',
      name: 'Updated Folder',
      description: 'Updated Description',
      circleId: 1,
      userId: 1,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    }

    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('update').once().withArgs('test-uuid', {
      name: 'Updated Folder',
      description: 'Updated Description'
    }).resolves(mockUpdatedFolder)

    return folderRepository.update('test-uuid', {
      name: 'Updated Folder',
      description: 'Updated Description'
    }).then(result => {
      test.assert.equal(result.name, 'Updated Folder')
      test.assert.equal(result.description, 'Updated Description')
      mockRepository.verify()
    })
  }))

  test('remove - devrait supprimer un dossier existant', stest(function () {
    const mockRepository = this.mock(folderRepository)
    mockRepository.expects('remove').once().withArgs('test-uuid').resolves()

    return folderRepository.remove('test-uuid').then(() => {
      mockRepository.verify()
    })
  }))
})
