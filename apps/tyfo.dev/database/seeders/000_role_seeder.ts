import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import { randomUUID } from 'node:crypto'

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
        await Role.updateOrCreate({ name: role.name }, { uuid: randomUUID(), ...role })
      })
    )

    console.log('✅ Rôles créés !')
  }
}
