import PermissionService from '#services/permission_service'
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import { PermissionFactory } from '#factories/permission_factory'
import PermissionRepository from '#repositories/permission_repository'

test.group('PermissionService (DB-based)', (group) => {
  let service: PermissionService

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    const permissionRepository = new PermissionRepository()
    service = new PermissionService(permissionRepository)
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('create permission', async ({ assert }) => {
    const permission = await service.createPermission({ action: 'MANAGE_USERS' })
    assert.exists(permission.uuid)
    assert.equal(permission.action, 'MANAGE_USERS')
  })

  test('get permission by action', async ({ assert }) => {
    const permission = await PermissionFactory.create()
    const foundPermission = await service.getPermissionByAction(permission.action)
    assert.exists(foundPermission)
    assert.equal(foundPermission?.action, permission.action)
  })
})
