// tests/functional/services/user_service.spec.ts
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'

import UserService from '#services/user_service'
import UserRepository from '#repositories/user_repository'
import User from '#models/user'
import { UserFactory } from '#factories/user_factory'
import { RoleFactory } from '#factories/role_factory'
import app from '@adonisjs/core/services/app'

test.group('UserService', (group) => {
  let service: UserService
  let userRepository: UserRepository

  group.each.setup(async () => {
    await db.beginGlobalTransaction()

    userRepository = new UserRepository()
    service = await app.container.make(UserService)
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('createUser - devrait créer un nouvel utilisateur avec des attributs valides', async ({
    assert,
  }) => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'John Doe',
    }

    // Act
    const user = await service.createUser(userData)

    // Assert
    assert.exists(user.uuid, "L'UUID de l'utilisateur devrait être généré")
    assert.equal(user.email, userData.email)
    assert.equal(user.fullName, userData.fullName)
    assert.notExists(
      user.deletedAt,
      'Le nouvel utilisateur ne devrait pas être marqué comme supprimé'
    )
  })

  test('getUserByUuid - devrait récupérer un utilisateur par son UUID', async ({ assert }) => {
    // Arrange
    const user = await UserFactory.create()

    // Act
    const foundUser = await service.getUserByUuid(user.uuid)

    // Assert
    assert.exists(foundUser)
    assert.equal(foundUser.uuid, user.uuid)
    assert.equal(foundUser.email, user.email)
    assert.equal(foundUser.fullName, user.fullName)
  })

  test('getUserByUuid - devrait lever une erreur si utilisateur non trouvé', async ({ assert }) => {
    // Act & Assert
    await assert.rejects(
      () => service.getUserByUuid('non-existent-uuid'),
      /Utilisateur avec UUID non-existent-uuid non trouvé/
    )
  })

  test("updateUser - devrait mettre à jour les attributs d'un utilisateur existant", async ({
    assert,
  }) => {
    // Arrange
    const user = await UserFactory.create()
    const updateData = {
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
    }

    // Act
    const updatedUser = await service.updateUser(user.uuid, updateData)

    // Assert
    assert.equal(updatedUser.fullName, updateData.fullName)
    assert.equal(updatedUser.email, updateData.email)

    // Vérifier que les données sont persistées en base
    const refreshedUser = await User.find(user.id)
    assert.equal(refreshedUser?.fullName, updateData.fullName)
    assert.equal(refreshedUser?.email, updateData.email)
  })

  test('deleteUser - devrait marquer un utilisateur comme supprimé (soft delete)', async ({
    assert,
  }) => {
    // Arrange
    const user = await UserFactory.create()

    // Act
    await service.deleteUser(user.uuid)

    // Assert
    const deletedUser = await User.find(user.id)
    assert.isNotNull(deletedUser?.deletedAt, "L'utilisateur devrait avoir une date de suppression")

    // Vérifier que l'utilisateur n'est plus récupérable via le repository
    const result = await userRepository.findByUuid(user.uuid)
    assert.isNull(result, "L'utilisateur supprimé ne devrait pas être récupérable")
  })

  test('listUsers - devrait filtrer les utilisateurs par critères', async ({ assert }) => {
    // Arrange
    await UserFactory.merge({ email: 'other@example.com' }).create()
    const targetEmail = 'target@example.com'
    await UserFactory.merge({ email: targetEmail }).create()

    // Act
    const users = await service.listUsers({ email: targetEmail })

    // Assert
    assert.equal(users.length, 1)
    assert.equal(users[0].email, targetEmail)
  })

  test('listUsers - devrait filtrer les utilisateurs par critères', async ({ assert }) => {
    // Arrange
    const targetEmail = 'special.user@example.com'
    await UserFactory.createMany(5)
    await UserFactory.create({ email: targetEmail })

    // Act
    const users = await service.listUsers({ email: targetEmail })

    // Assert
    assert.equal(users.length, 1)
    assert.equal(users[0].email, targetEmail)
  })

  test('assignRole - devrait attribuer un rôle à un utilisateur', async ({ assert }) => {
    // Arrange
    const user = await UserFactory.create()
    const role = await RoleFactory.create()

    // Act
    await service.assignRole(user.uuid, role.uuid)

    // Assert
    const userRoles = await service.listRolesByUser(user.uuid)
    assert.equal(userRoles.length, 1)
    assert.equal(userRoles[0].uuid, role.uuid)
  })

  test("removeRole - devrait retirer un rôle d'un utilisateur", async ({ assert }) => {
    // Arrange
    const user = await UserFactory.create()
    const role = await RoleFactory.create()

    // Attribuer d'abord le rôle
    await service.assignRole(user.uuid, role.uuid)

    // Vérifier que le rôle est bien attribué
    let userRoles = await service.listRolesByUser(user.uuid)
    assert.equal(userRoles.length, 1)

    // Act
    await service.removeRole(user.uuid, role.uuid)

    // Assert
    userRoles = await service.listRolesByUser(user.uuid)
    assert.equal(userRoles.length, 0, "L'utilisateur ne devrait plus avoir de rôles")
  })

  test("listRolesByUser - devrait retourner tous les rôles d'un utilisateur", async ({
    assert,
  }) => {
    // Arrange
    const user = await UserFactory.create()
    const roles = await RoleFactory.createMany(3)

    for (const role of roles) {
      await service.assignRole(user.uuid, role.uuid)
    }

    // Act
    const userRoles = await service.listRolesByUser(user.uuid)

    // Assert
    assert.equal(userRoles.length, 3)
    const roleUuids = userRoles.map((r) => r.uuid)
    for (const role of roles) {
      assert.include(roleUuids, role.uuid)
    }
  })
})
