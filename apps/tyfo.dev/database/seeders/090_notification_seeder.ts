import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { NotificationFactory } from '#factories/notification_factory'
import User from '#models/user'

export default class NotificationSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Génération des notifications...')

    const users = await User.all()

    if (!users.length) {
      console.warn('⚠️ Aucun utilisateur trouvé. Vérifie tes seeders.')
      return
    }

    const templates = ['file_uploaded', 'new_message', 'task_assigned']

    // Génération des notifications pour des utilisateurs
    await NotificationFactory.merge({
      userId: users[Math.floor(Math.random() * users.length)].id,
      template: templates[Math.floor(Math.random() * templates.length)],
    }).createMany(15)

    console.log('✅ Notifications créées avec succès !')
  }
}
