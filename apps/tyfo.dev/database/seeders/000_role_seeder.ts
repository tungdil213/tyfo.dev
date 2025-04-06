import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import { generateUuid } from '#utils/uuid_helper'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Création des rôles...')

    const roles = [
      { name: 'Admin', description: 'Accès total' },
      { name: 'Prestataire', description: 'Gère les cercles et les attributions' },
      { name: 'Consommateur', description: 'Accès limité aux documents' },
    ]

    await Promise.all(
      roles.map(async (role) => {
        await Role.updateOrCreate({ name: role.name }, { uuid: generateUuid(), ...role })
      })
    )

    console.log('✅ Rôles créés !')
  }
}
