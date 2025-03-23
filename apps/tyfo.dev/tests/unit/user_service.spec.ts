// tests/functional/services/user_service.spec.ts
import UserService from '#services/user_service'
import FakeUserRepository from '#repositories/fake_user_repository'
import { test } from '@japa/runner'

import Role from '#models/role'
import User from '#models/user'
import FakeRoleRepository from '#repositories/fake_role_repository'

test.group('UserService (with FakeRepository)', (group) => {
  let service: UserService
  let fakeUserRepository: FakeUserRepository
  let fakeRoleRepository: FakeRoleRepository

  group.each.setup(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeRoleRepository = new FakeRoleRepository()
    service = new UserService(fakeUserRepository, fakeRoleRepository)
  })

  test('create user', async ({ assert }) => {
    const data = { email: 'test@example.com', password: 'password', fullName: 'John Doe' }
    const user = await service.createUser(data)
    assert.exists(user.uuid)
    assert.equal(user.email, data.email)
    assert.equal(user.fullName, data.fullName)
  })

  test('get user by uuid', async ({ assert }) => {
    const createdUser = await service.createUser({
      email: 'test@example.com',
      password: 'password',
      fullName: 'John Doe',
    })
    const user = await service.getUserByUuid(createdUser.uuid)
    assert.exists(user)
    assert.equal(user.email, createdUser.email)
  })

  test('update user', async ({ assert }) => {
    const createdUser = await service.createUser({
      email: 'test@example.com',
      password: 'password',
      fullName: 'John Doe',
    })
    const updatedUser = await service.updateUser(createdUser.uuid, { fullName: 'Jane Doe' })
    assert.equal(updatedUser.fullName, 'Jane Doe')
  })

  test('archive user', async ({ assert }) => {
    const createdUser = await service.createUser({
      email: 'test@example.com',
      password: 'password',
      fullName: 'John Doe',
    })
    await service.archiveUser(createdUser.uuid)
    const user = await fakeUserRepository.findByUuid(createdUser.uuid)
    assert.isTrue(user?.isArchived)
  })
})
