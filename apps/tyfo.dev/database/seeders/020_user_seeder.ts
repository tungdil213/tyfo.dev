import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#factories/user_factory'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Création des utilisateurs...')

    await UserFactory.createMany(10)

    console.log('✅ Utilisateurs créés !')
  }
}
