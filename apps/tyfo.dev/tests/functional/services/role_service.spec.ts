import RoleService from '#services/role_service'
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import { RoleFactory } from '#factories/role_factory'
import RoleRepository from '#repositories/role_repository'

test.group('RoleService (DB-based)', (group) => {
  let service: RoleService

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    const roleRepository = new RoleRepository()
    service = new RoleService(roleRepository)
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('create role', async ({ assert }) => {
    const role = await service.createRole({ name: 'Admin', description: 'Accès total' })
    assert.exists(role.uuid)
    assert.equal(role.name, 'Admin')
  })

  test('get role by name', async ({ assert }) => {
    const role = await RoleFactory.create()
    const foundRole = await service.getRoleByName(role.name)
    assert.exists(foundRole)
    assert.equal(foundRole?.name, role.name)
  })
})
