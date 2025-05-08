import Factory from '@adonisjs/lucid/factories'
import Permission from '#models/permission'
import { generateUuid } from '#utils/uuid_helper'

const actions = [
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
]

export const PermissionFactory = Factory.define(Permission, async () => ({
  uuid: generateUuid(),
  action: actions.pop() || 'DEFAULT_ACTION', // Évite les doublons
})).build()
