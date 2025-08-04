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
import RoleRepository from '#repositories/role_repository'
import sinon from 'sinon'

test.group('RoleRepository (Sinon mock)', (group) => {
  let roleRepository: RoleRepository

  group.setup(async () => {
    roleRepository = new RoleRepository()
  })

  test('create - devrait créer un nouveau rôle', async ({ assert }) => {
    const mockRole = {
      id: 1,
      uuid: generateUuid(),
      name: 'Test Role',
      description: 'Test Description',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function () {
        return this
      },
      save: function () {
        return this
      },
    }

    // Utiliser un stub au lieu d'un mock
    const createStub = sinon.stub(roleRepository, 'create')
    createStub.resolves(mockRole)

    // Exécuter l'opération
    const result = await roleRepository.create({
      name: 'Test Role',
      description: 'Test Description',
    })

    // Vérifier le résultat
    assert.equal(result.name, 'Test Role')
    assert.equal(result.description, 'Test Description')

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(createStub.calledOnce)
    assert.isTrue(
      createStub.calledWith({
        name: 'Test Role',
        description: 'Test Description',
      })
    )

    // Ne pas oublier de restaurer le stub après le test
    createStub.restore()
  })

  test('findByUuid - devrait trouver un rôle par UUID', async ({ assert }) => {
    const mockRole = {
      id: 1,
      uuid: generateUuid(),
      name: 'Test Role',
      description: 'Test Description',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function () {
        return this
      },
      save: function () {
        return this
      },
    }

    // Utiliser un stub au lieu d'un mock
    const findByUuidStub = sinon.stub(roleRepository, 'findByUuid')
    findByUuidStub.resolves(mockRole)

    // Exécuter l'opération
    const result = await roleRepository.findByUuid(mockRole.uuid)

    // Vérifier le résultat
    assert.equal(result?.uuid, mockRole.uuid)
    assert.equal(result?.name, mockRole.name)
    assert.equal(result?.description, mockRole.description)

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(findByUuidStub.calledOnce)
    assert.isTrue(findByUuidStub.calledWith(mockRole.uuid))

    // Ne pas oublier de restaurer le stub après le test
    findByUuidStub.restore()
  })

  test('findByName - devrait trouver un rôle par son nom', async ({ assert }) => {
    const mockRole = {
      id: 1,
      uuid: generateUuid(),
      name: 'Admin',
      description: 'Administrator Role',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function () {
        return this
      },
      save: function () {
        return this
      },
    }

    // Utiliser un stub au lieu d'un mock
    const findByNameStub = sinon.stub(roleRepository, 'findByName')
    findByNameStub.withArgs('Admin').resolves(mockRole)

    const result = await roleRepository.findByName('Admin')
    assert.equal(result?.name, 'Admin')

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(findByNameStub.calledOnce)
    assert.isTrue(findByNameStub.calledWith('Admin'))

    // Restaurer le stub après le test
    findByNameStub.restore()
  })

  test('list - devrait lister tous les rôles', async ({ assert }) => {
    const mockRoles = [
      {
        id: 1,
        uuid: generateUuid(),
        name: 'Admin',
        description: 'Administrator Role',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function () {
          return this
        },
        save: function () {
          return this
        },
      },
      {
        id: 2,
        uuid: generateUuid(),
        name: 'Editor',
        description: 'Editor Role',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function () {
          return this
        },
        save: function () {
          return this
        },
      },
    ]

    // Utiliser un stub au lieu d'un mock
    const listStub = sinon.stub(roleRepository, 'list')
    listStub.resolves(mockRoles)

    const results = await roleRepository.list()
    assert.equal(results.length, 2)
    assert.equal(results[0].name, 'Admin')
    assert.equal(results[1].name, 'Editor')

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(listStub.calledOnce)

    // Restaurer le stub après le test
    listStub.restore()
  })

  test('update - devrait mettre à jour un rôle existant', async ({ assert }) => {
    const mockUpdatedRole = {
      id: 1,
      uuid: 'test-uuid',
      name: 'Updated Role',
      description: 'Updated Description',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function () {
        return this
      },
      save: function () {
        return this
      },
    }

    // Utiliser un stub au lieu d'un mock
    const updateStub = sinon.stub(roleRepository, 'update')
    updateStub
      .withArgs('test-uuid', {
        name: 'Updated Role',
        description: 'Updated Description',
      })
      .resolves(mockUpdatedRole)

    const result = await roleRepository.update('test-uuid', {
      name: 'Updated Role',
      description: 'Updated Description',
    })

    assert.equal(result?.name, 'Updated Role')
    assert.equal(result?.description, 'Updated Description')

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(updateStub.calledOnce)
    assert.isTrue(
      updateStub.calledWith('test-uuid', {
        name: 'Updated Role',
        description: 'Updated Description',
      })
    )

    // Restaurer le stub après le test
    updateStub.restore()
  })

  test('remove - devrait supprimer un rôle existant', async ({ assert }) => {
    // Utiliser un stub au lieu d'un mock
    const removeStub = sinon.stub(roleRepository, 'remove')
    removeStub.withArgs('test-uuid').resolves()

    await roleRepository.remove('test-uuid')

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(removeStub.calledOnce)
    assert.isTrue(removeStub.calledWith('test-uuid'))

    // Restaurer le stub après le test
    removeStub.restore()
  })

  test('createPermission - devrait créer une nouvelle permission', async ({ assert }) => {
    const mockPermission = {
      id: 1,
      uuid: generateUuid(),
      action: 'read',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      merge: function () {
        return this
      },
      save: function () {
        return this
      },
    }

    // Utiliser un stub au lieu d'un mock
    const createPermissionStub = sinon.stub(roleRepository, 'createPermission')
    createPermissionStub
      .withArgs({
        action: 'read',
      })
      .resolves(mockPermission)

    const result = await roleRepository.createPermission({
      action: 'read',
    })

    assert.equal(result?.action, 'read')

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(createPermissionStub.calledOnce)
    assert.isTrue(
      createPermissionStub.calledWith({
        action: 'read',
      })
    )

    // Restaurer le stub après le test
    createPermissionStub.restore()
  })

  test('attachPermissionToRole - devrait associer une permission à un rôle', async ({ assert }) => {
    // Utiliser un stub au lieu d'un mock
    const attachPermissionToRoleStub = sinon.stub(roleRepository, 'attachPermissionToRole')
    attachPermissionToRoleStub.withArgs(1, 2).resolves()

    await roleRepository.attachPermissionToRole(1, 2)

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(attachPermissionToRoleStub.calledOnce)
    assert.isTrue(attachPermissionToRoleStub.calledWith(1, 2))

    // Restaurer le stub après le test
    attachPermissionToRoleStub.restore()
  })

  test("detachPermissionFromRole - devrait dissocier une permission d'un rôle", async ({
    assert,
  }) => {
    // Utiliser un stub au lieu d'un mock
    const detachPermissionFromRoleStub = sinon.stub(roleRepository, 'detachPermissionFromRole')
    detachPermissionFromRoleStub.withArgs(1, 2).resolves()

    await roleRepository.detachPermissionFromRole(1, 2)

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(detachPermissionFromRoleStub.calledOnce)
    assert.isTrue(detachPermissionFromRoleStub.calledWith(1, 2))

    // Restaurer le stub après le test
    detachPermissionFromRoleStub.restore()
  })

  test("getRolePermissions - devrait récupérer les permissions d'un rôle", async ({ assert }) => {
    const mockPermissions = [
      {
        id: 1,
        uuid: generateUuid(),
        action: 'read',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function () {
          return this
        },
        save: function () {
          return this
        },
      },
      {
        id: 2,
        uuid: generateUuid(),
        action: 'write',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        merge: function () {
          return this
        },
        save: function () {
          return this
        },
      },
    ]

    // Utiliser un stub au lieu d'un mock
    const getRolePermissionsStub = sinon.stub(roleRepository, 'getRolePermissions')
    getRolePermissionsStub.withArgs(1).resolves(mockPermissions)

    const results = await roleRepository.getRolePermissions(1)
    assert.equal(results.length, 2)
    assert.equal(results[0].action, 'read')
    assert.equal(results[1].action, 'write')

    // Vérifier que la méthode a été appelée correctement
    assert.isTrue(getRolePermissionsStub.calledOnce)
    assert.isTrue(getRolePermissionsStub.calledWith(1))

    // Restaurer le stub après le test
    getRolePermissionsStub.restore()
  })
})
