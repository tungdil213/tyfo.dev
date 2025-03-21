import Factory from '@adonisjs/lucid/factories'
import Permission from '#models/permission'
import { RoleFactory } from '#factories/role_factory'
import { randomUUID } from 'node:crypto'

export const PermissionFactory = Factory.define(Permission, async ({ faker }) => {
  return {
    uuid: randomUUID(),
    action: faker.helpers.arrayElement([
      'CREATE_CIRCLE',
      'DELETE_CIRCLE',
      'MANAGE_USERS',
      'VIEW_DOCUMENTS',
      'UPLOAD_FILES',
      'DELETE_FILES',
      'EDIT_DOCUMENTS',
      'ARCHIVE_CIRCLE',
      'VIEW_LOGS',
      'RECEIVE_NOTIFICATIONS',
    ]),
  }
})
  .relation('role', () => RoleFactory)
  .build()
