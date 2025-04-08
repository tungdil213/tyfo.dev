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
    const role = await Role.create({ name: 'Admin' }) // Ajouter un rôle ici
    // Simulez l'attribution d'un rôle, par exemple via un service d'attribution
    await userRepository.assignRole(user.uuid, role.id)

    const roles = await service.getUserRoles(user.uuid)

    assert.equal(roles.length, 1)
    assert.equal(roles[0].id, role.id)
  })

  test("getUserCircles - devrait retourner les cercles d'un utilisateur", async ({ assert }) => {
    const user = await UserFactory.create()
    const circle = await Circle.create({ name: 'Circle A' })
    await userRepository.attachUserToCircle(user.uuid, circle.id) // Simulez l'attachement d'un utilisateur à un cercle

    const circles = await service.getUserCircles(user.uuid)

    assert.equal(circles.length, 1)
    assert.equal(circles[0].id, circle.id)
  })
})
