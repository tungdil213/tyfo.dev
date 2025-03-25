// tests/functional/services/user_service.spec.ts
import UserService from '#services/user_service'
import { test } from '@japa/runner'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { UserFactory } from '#factories/user_factory'
import RoleRepository from '#repositories/role_repository'
import UserRepository from '#repositories/user_repository'

test.group('UserService (DB-based)', (group) => {
  let service: UserService

  group.each.setup(async () => {
    await db.beginGlobalTransaction()

    const userRepository = new UserRepository()
    const roleRepository = new RoleRepository()

    service = new UserService(userRepository, roleRepository)
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('create user', async ({ assert }) => {
    const data = { email: 'test@example.com', password: 'password', fullName: 'John Doe' }
    const user = await service.createUser(data)

    assert.exists(user.uuid)
    assert.equal(user.email, data.email)
    assert.equal(user.fullName, data.fullName)
  })

  test('get user by uuid', async ({ assert }) => {
    const user = await UserFactory.create()
    const foundUser = await service.getUserByUuid(user.uuid)

    assert.exists(foundUser)
    assert.equal(foundUser?.email, user.email)
  })

  test('update user', async ({ assert }) => {
    const user = await UserFactory.create()
    const updatedUser = await service.updateUser(user.uuid, { fullName: 'Jane Doe' })

    assert.equal(updatedUser.fullName, 'Jane Doe')
  })

  test('archive user', async ({ assert }) => {
    const user = await UserFactory.create()
    await service.deleteUser(user.uuid)

    const archivedUser = await User.find(user.id)
    assert.isNotNull(archivedUser?.deletedAt)
  })
})
