import { test } from '@japa/runner'
import UserService from '#services/user_service'
import User from '#models/user'

test.group('UserService', () => {
  const userService = new UserService()

  test('Créer un utilisateur', async ({ assert }) => {
    const user = await userService.createUser({
      email: 'test@example.com',
      fullName: 'John Doe',
    })

    assert.isNotNull(user)
    assert.equal(user.email, 'test@example.com')
  })

  test('Mettre à jour un utilisateur', async ({ assert }) => {
    const user = await userService.createUser({
      email: 'update@example.com',
      fullName: 'Before Update',
    })

    const updatedUser = await userService.updateUser(user.id, { name: 'After Update' })

    assert.equal(updatedUser.fullName, 'After Update')
  })

  test('Archiver un utilisateur', async ({ assert }) => {
    const user = await userService.createUser({
      email: 'archive@example.com',
    })

    await userService.archiveUser(user.id)
    const archivedUser = await userService.getUserById(user.id)

    assert.isTrue(archivedUser.isArchived)
  })
})
