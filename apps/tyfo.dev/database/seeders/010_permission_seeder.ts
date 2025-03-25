import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Permission from '#models/permission'
import { randomUUID } from 'node:crypto'

export default class PermissionSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Création des permissions...')

    const permissions = [
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

    await Promise.all(
      permissions.map(async (action) => {
        await Permission.updateOrCreate({ action }, { uuid: randomUUID(), action })
      })
    )

    console.log('✅ Permissions créées !')
  }
}
