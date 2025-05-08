import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ObjectModelFactory } from '#factories/object_model_factory'
import Folder from '#models/folder'
import User from '#models/user'

export default class ObjectModelSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Téléversement de fichiers...')

    const folders = await Folder.all()
    const users = await User.all()

    if (!folders.length) {
      console.warn('⚠️ Aucun dossier trouvé, impossible de téléverser des fichiers.')
      return
    }

    await Promise.all(
      folders.map(async (folder) => {
        await ObjectModelFactory.merge({
          folderId: folder.id,
          userId: users.length ? users[Math.floor(Math.random() * users.length)].id : undefined,
          revision: 1, // 🔥 Première version du fichier
        }).createMany(2) // 🔥 Chaque dossier reçoit 2 fichiers
      })
    )

    console.log('✅ Fichiers téléversés !')
  }
}
