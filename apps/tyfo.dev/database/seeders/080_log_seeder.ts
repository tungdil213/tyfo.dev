import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { LogFactory } from '#factories/log_factory'
import User from '#models/user'
import { generateUuid } from '#utils/uuid_helper'

export default class LogSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Génération des logs d’activité...')

    const users = await User.all()

    if (!users.length) {
      console.warn('⚠️ Aucun utilisateur trouvé. Vérifie tes seeders.')
      return
    }

    const actions = ['UPLOAD_FILE', 'DOWNLOAD_FILE', 'DELETE_FILE']

    // Génération de logs aléatoires avec un utilisateur
    await LogFactory.merge({
      userId: users[Math.floor(Math.random() * users.length)].id,
      action: actions[Math.floor(Math.random() * actions.length)],
      primaryType: 'Object',
      primaryObject: generateUuid(),
    }).createMany(30)

    console.log('✅ Logs créés avec succès !')
  }
}
