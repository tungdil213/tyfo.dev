/**
 * @fileoverview Tests mockés pour le RoleRepository utilisant Sinon
 * 
 * Ce fichier implémente une version mockée du RoleRepository avec Sinon
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
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import RoleRepository from '#repositories/role_repository'
import sinon from 'sinon'
import sinonTest from 'sinon-test'
import Role from '#models/role'
import Permission from '#models/permission'

test.group('RoleRepository (Sinon mock)', (group) => {
  let roleRepository: RoleRepository
  const stest = sinonTest(sinon, { useFakeTimers: false })

  group.setup(async () => {
    roleRepository = new RoleRepository()
  })

  test('create - devrait créer un nouveau rôle', stest(async function () {
    const mockRole = {
      id: 1,
      uuid: generateUuid(),
      name: 'Test Role',
      description: 'Test Description',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function() { return this },
      save: function() { return this }
    }

    // Utiliser un stub au lieu d'un mock
    const createStub = this.stub(roleRepository, 'create')
    createStub.resolves(mockRole)

    // Exécuter l'opération
    const result = await roleRepository.create({
      name: 'Test Role',
      description: 'Test Description'
    })
    
    // Vérifier le résultat
    test.assert.equal(result.name, 'Test Role')
    test.assert.equal(result.description, 'Test Description')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(createStub.calledOnce)
    test.assert.isTrue(createStub.calledWith({
      name: 'Test Role',
      description: 'Test Description'
    }))
  }))

  test('findByUuid - devrait trouver un rôle par UUID', stest(async function () {
    const mockRole = {
      id: 1,
      uuid: 'test-uuid',
      name: 'Test Role',
      description: 'Test Description',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function() { return this },
      save: function() { return this }
    }

    // Utiliser un stub au lieu d'un mock
    const findByUuidStub = this.stub(roleRepository, 'findByUuid')
    findByUuidStub.withArgs('test-uuid').resolves(mockRole)

    const result = await roleRepository.findByUuid('test-uuid')
    test.assert.equal(result.uuid, 'test-uuid')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(findByUuidStub.calledOnce)
    test.assert.isTrue(findByUuidStub.calledWith('test-uuid'))
  }))

  test('findByName - devrait trouver un rôle par son nom', stest(async function () {
    const mockRole = {
      id: 1,
      uuid: generateUuid(),
      name: 'Admin',
      description: 'Administrator Role',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function() { return this },
      save: function() { return this }
    }

    // Utiliser un stub au lieu d'un mock
    const findByNameStub = this.stub(roleRepository, 'findByName')
    findByNameStub.withArgs('Admin').resolves(mockRole)

    const result = await roleRepository.findByName('Admin')
    test.assert.equal(result.name, 'Admin')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(findByNameStub.calledOnce)
    test.assert.isTrue(findByNameStub.calledWith('Admin'))
  }))

  test('list - devrait lister tous les rôles', stest(async function () {
    const mockRoles = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Admin',
        description: 'Administrator Role',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function() { return this },
        save: function() { return this }
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Editor',
        description: 'Editor Role',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function() { return this },
        save: function() { return this }
      }
    ]

    // Utiliser un stub au lieu d'un mock
    const listStub = this.stub(roleRepository, 'list')
    listStub.resolves(mockRoles)

    const results = await roleRepository.list()
    test.assert.equal(results.length, 2)
    test.assert.equal(results[0].name, 'Admin')
    test.assert.equal(results[1].name, 'Editor')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(listStub.calledOnce)
  }))

  test('update - devrait mettre à jour un rôle existant', stest(async function () {
    const mockUpdatedRole = {
      id: 1,
      uuid: 'test-uuid',
      name: 'Updated Role',
      description: 'Updated Description',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function() { return this },
      save: function() { return this }
    }

    // Utiliser un stub au lieu d'un mock
    const updateStub = this.stub(roleRepository, 'update')
    updateStub.withArgs('test-uuid', {
      name: 'Updated Role',
      description: 'Updated Description'
    }).resolves(mockUpdatedRole)

    const result = await roleRepository.update('test-uuid', {
      name: 'Updated Role',
      description: 'Updated Description'
    })
    
    test.assert.equal(result.name, 'Updated Role')
    test.assert.equal(result.description, 'Updated Description')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(updateStub.calledOnce)
    test.assert.isTrue(updateStub.calledWith('test-uuid', {
      name: 'Updated Role',
      description: 'Updated Description'
    }))
  }))

  test('remove - devrait supprimer un rôle existant', stest(async function () {
    // Utiliser un stub au lieu d'un mock
    const removeStub = this.stub(roleRepository, 'remove')
    removeStub.withArgs('test-uuid').resolves()

    await roleRepository.remove('test-uuid')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(removeStub.calledOnce)
    test.assert.isTrue(removeStub.calledWith('test-uuid'))
  }))

  test('createPermission - devrait créer une nouvelle permission', stest(async function () {
    const mockPermission = {
      id: 1,
      uuid: generateUuid(),
      action: 'read',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function() { return this },
      save: function() { return this }
    }

    // Utiliser un stub au lieu d'un mock
    const createPermissionStub = this.stub(roleRepository, 'createPermission')
    createPermissionStub.withArgs({
      action: 'read'
    }).resolves(mockPermission)

    const result = await roleRepository.createPermission({
      action: 'read'
    })
    
    test.assert.equal(result.action, 'read')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(createPermissionStub.calledOnce)
    test.assert.isTrue(createPermissionStub.calledWith({
      action: 'read'
    }))
  }))

  test('attachPermissionToRole - devrait associer une permission à un rôle', stest(async function () {
    // Utiliser un stub au lieu d'un mock
    const attachPermissionToRoleStub = this.stub(roleRepository, 'attachPermissionToRole')
    attachPermissionToRoleStub.withArgs(1, 2).resolves()

    await roleRepository.attachPermissionToRole(1, 2)
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(attachPermissionToRoleStub.calledOnce)
    test.assert.isTrue(attachPermissionToRoleStub.calledWith(1, 2))
  }))

  test('detachPermissionFromRole - devrait dissocier une permission d\'un rôle', stest(async function () {
    // Utiliser un stub au lieu d'un mock
    const detachPermissionFromRoleStub = this.stub(roleRepository, 'detachPermissionFromRole')
    detachPermissionFromRoleStub.withArgs(1, 2).resolves()

    await roleRepository.detachPermissionFromRole(1, 2)
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(detachPermissionFromRoleStub.calledOnce)
    test.assert.isTrue(detachPermissionFromRoleStub.calledWith(1, 2))
  }))

  test('getRolePermissions - devrait récupérer les permissions d\'un rôle', stest(async function () {
    const mockPermissions = [
      {
        id: 1,
        uuid: generateUuid(),
        action: 'read',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function() { return this },
        save: function() { return this }
      },
      {
        id: 2,
        uuid: generateUuid(),
        action: 'write',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function() { return this },
        save: function() { return this }
      }
    ]

    // Utiliser un stub au lieu d'un mock
    const getRolePermissionsStub = this.stub(roleRepository, 'getRolePermissions')
    getRolePermissionsStub.withArgs(1).resolves(mockPermissions)

    const results = await roleRepository.getRolePermissions(1)
    test.assert.equal(results.length, 2)
    test.assert.equal(results[0].action, 'read')
    test.assert.equal(results[1].action, 'write')
    
    // Vérifier que la méthode a été appelée correctement
    test.assert.isTrue(getRolePermissionsStub.calledOnce)
    test.assert.isTrue(getRolePermissionsStub.calledWith(1))
  }))
})
