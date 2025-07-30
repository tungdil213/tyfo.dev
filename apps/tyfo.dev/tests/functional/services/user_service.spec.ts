// tests/functional/services/user_service.spec.ts
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import UserRepository from '#repositories/user_repository'
import UserService from '#services/user_service'
import { UserFactory } from '#factories/user_factory'
import Role from '#models/role'
import Circle from '#models/circle'

test.group('UserService', (group) => {
  let service: UserService
  let userRepository: UserRepository

  // Setup de groupes
  group.setup(async () => {
    userRepository = new UserRepository()
    service = new UserService(userRepository)
  })

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('createUser - devrait créer un nouvel utilisateur', async ({ assert }) => {
    const userData = {
      email: 'new.user@example.com',
      fullName: 'New User',
      password: 'password123',
    }

    const createdUser = await service.createUser(userData)

    assert.exists(createdUser)
    assert.equal(createdUser.email, userData.email)
    assert.equal(createdUser.fullName, userData.fullName)

    // Vérifier que l'utilisateur a bien été créé en base
    const foundUser = await userRepository.findByEmail(userData.email)
    assert.exists(foundUser)
  })

  test('updateUser - devrait mettre à jour un utilisateur existant', async ({ assert }) => {
    const user = await UserFactory.create()
    const updateData = {
      fullName: 'Updated Name',
    }

    const updatedUser = await service.updateUser(user.uuid, updateData)

    assert.equal(updatedUser.fullName, updateData.fullName)
    assert.equal(updatedUser.email, user.email) // Pas modifié

    // Vérifier que les modifications sont bien en base
    const foundUser = await userRepository.findByUuid(user.uuid)
    assert.equal(foundUser?.fullName, updateData.fullName)
  })

  test('deleteUser - devrait supprimer définitivement un utilisateur', async ({ assert }) => {
    const user = await UserFactory.create()

    await service.deleteUser(user.uuid)

    // Vérifier que l'utilisateur n'existe plus
    const foundUser = await userRepository.findByUuid(user.uuid)
    assert.isNull(foundUser)
  })

  test('getUserByUuid - devrait retourner un utilisateur par son UUID', async ({ assert }) => {
    const user = await UserFactory.create()

    const foundUser = await service.getUserByUuid(user.uuid)

    assert.exists(foundUser)
    assert.equal(foundUser.uuid, user.uuid)
    assert.equal(foundUser.email, user.email)
  })

  test("getUserByUuid - devrait lancer une erreur si l'utilisateur n'existe pas", async ({
    assert,
  }) => {
    try {
      await service.getUserByUuid('non-existent-uuid')
      assert.fail('La méthode aurait dû lancer une erreur')
    } catch (error) {
      assert.exists(error)
    }
  })

  test('assignRole - devrait assigner un rôle à un utilisateur dans un cercle', async ({
    assert,
  }) => {
    const user = await UserFactory.create()
    const role = await Role.create({ name: 'Editor', description: 'Can edit content' })
    const circle = await Circle.create({
      name: 'Project Circle',
      description: 'A project circle',
      userId: user.id,
    })

    await service.assignRole(user.uuid, role.uuid, circle.uuid)

    // Vérifier que le rôle a été assigné
    const userRoles = await service.getUserRoles(user.uuid)
    assert.isTrue(userRoles.some((r) => r.id === role.id))
  })

  test('removeRole - devrait retirer un rôle à un utilisateur', async ({ assert }) => {
    const user = await UserFactory.create()
    const role = await Role.create({ name: 'Temporary', description: 'Temporary role' })
    const circle = await Circle.create({
      name: 'Temp Circle',
      description: 'Temporary circle',
      userId: user.id,
    })

    // D'abord assigner le rôle
    await service.assignRole(user.uuid, role.uuid, circle.uuid)

    // Puis le retirer
    await service.removeRole(user.uuid, role.uuid)

    // Vérifier que le rôle n'est plus assigné
    const userRoles = await service.getUserRoles(user.uuid)
    assert.isFalse(userRoles.some((r) => r.id === role.id))
  })

  test('listUsers - devrait lister les utilisateurs avec filtres', async ({ assert }) => {
    // Créer quelques utilisateurs pour le test
    await UserFactory.merge({ fullName: 'Test User' }).createMany(3)
    await UserFactory.merge({ fullName: 'Other User' }).createMany(2)

    // Récupérer les utilisateurs avec le nom 'Test User'
    const testUsers = await service.listUsers({ fullName: 'Test User' })

    // Vérifier qu'on a au moins 3 utilisateurs avec ce nom
    assert.isTrue(testUsers.length >= 3, `Nombre d'utilisateurs 'Test User' insuffisant: ${testUsers.length}`)
    testUsers.forEach((user) => {
      assert.equal(user.fullName, 'Test User')
    })

    // Récupérer tous les utilisateurs
    const allUsers = await service.listUsers({})
    assert.isTrue(allUsers.length >= 5) // Au moins nos 5 utilisateurs créés
  })

  test("listRolesByUser - devrait lister les rôles d'un utilisateur", async ({ assert }) => {
    const user = await UserFactory.create()
    const role1 = await Role.create({ name: 'Role1', description: 'First role' })
    const role2 = await Role.create({ name: 'Role2', description: 'Second role' })
    const circle = await Circle.create({
      name: 'Test Circle',
      description: 'Test circle description',
      userId: user.id,
    })
    
    // Assigner deux rôles
    await service.assignRole(user.uuid, role1.uuid, circle.uuid)
    await service.assignRole(user.uuid, role2.uuid, circle.uuid)

    // Lister les rôles
    const roles = await service.listRolesByUser(user.uuid)
    
    assert.equal(roles.length, 2)
    const roleIds = roles.map((r) => r.id)
    assert.include(roleIds, role1.id)
    assert.include(roleIds, role2.id)
  })

  test('findByEmail - devrait retourner un utilisateur valide', async ({ assert }) => {
    const user = await UserFactory.create()

    const foundUser = await service.findByEmail(user.email)

    assert.exists(foundUser)
    assert.equal(foundUser?.email, user.email)
  })

  test("findByEmail - devrait retourner null si l'utilisateur n'existe pas", async ({ assert }) => {
    const foundUser = await service.findByEmail('nonexistent@example.com')
    assert.isNull(foundUser)
  })

  test('softDelete - devrait marquer un utilisateur comme supprimé', async ({ assert }) => {
    const user = await UserFactory.create()

    await service.softDelete(user.uuid)

    console.log(' console.log(user.deletedAt)', user.deletedAt)

    const deletedUser = await userRepository.findByUuid(user.uuid)

    assert.isNotNull(deletedUser?.deletedAt, "L'utilisateur ne devrait pas être récupérable")
  })

  test('restore - devrait restaurer un utilisateur supprimé', async ({ assert }) => {
    const user = await UserFactory.create()
    await service.softDelete(user.uuid)

    const restoredUser = await service.restore(user.uuid)

    assert.isNotNull(restoredUser)
    assert.isNull(restoredUser.deletedAt, "L'utilisateur devrait avoir été restauré")
  })

  test("getUserRoles - devrait retourner les rôles d'un utilisateur", async ({ assert }) => {
    const user = await UserFactory.create()
    const role = await Role.create({ name: 'Admin', description: 'Administrator role' }) // Ajouter un rôle ici
    // Créons un cercle auquel associer le rôle
    const circle = await Circle.create({
      name: 'Admin Circle',
      description: 'Admin circle',
      userId: user.id,
    })
    // Simulez l'attribution d'un rôle, par exemple via un service d'attribution
    await userRepository.assignRoleToUser(user.uuid, role.id, circle.id)

    const roles = await service.getUserRoles(user.uuid)

    assert.equal(roles.length, 1)
    assert.equal(roles[0].id, role.id)
  })

  test("getUserCircles - devrait retourner les cercles d'un utilisateur", async ({ assert }) => {
    const user = await UserFactory.create()
    const circle = await Circle.create({
      name: 'Circle A',
      description: 'Circle A description',
      userId: user.id,
    })
    await userRepository.attachUserToCircle(user.uuid, circle.id) // Simulez l'attachement d'un utilisateur à un cercle

    const circles = await service.getUserCircles(user.uuid)

    assert.equal(circles.length, 1)
    assert.equal(circles[0].id, circle.id)
  })
})
