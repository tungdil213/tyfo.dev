import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { CircleFactory } from '#factories/circle_factory'
import User from '#models/user'

export default class CircleSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Création des cercles...')

    const users = await User.all() // Récupérer les utilisateurs existants

    if (!users.length) {
      console.warn('⚠️ Aucun utilisateur trouvé, création des cercles sans propriétaire.')
    }

    // Création des cercles avec un propriétaire aléatoire (si users existent)
    await CircleFactory.merge({
      userId: users.length ? users[Math.floor(Math.random() * users.length)].id : undefined,
    }).createMany(5)

    console.log('✅ Cercles créés avec propriétaires !')
  }
}
