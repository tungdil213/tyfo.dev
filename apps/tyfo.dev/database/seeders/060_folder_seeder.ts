import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { FolderFactory } from '#factories/folder_factory'
import Circle from '#models/circle'
import User from '#models/user'
import Folder from '#models/folder'

export default class FolderSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Création des dossiers...')

    const circles = await Circle.all()
    const users = await User.all()

    console.log(`🟢 ${circles.length} cercles trouvés.`)
    console.log(`🟢 ${users.length} utilisateurs trouvés.`)

    if (!circles.length) {
      console.warn('⚠️ Aucun cercle trouvé, création des dossiers impossible.')
      return
    }

    const createdFolders: Folder[] = []

    for (const circle of circles) {
      for (let i = 0; i < 15; i++) {
        // 🔥 Créer un dossier racine
        const rootFolder = await FolderFactory.apply('root')
          .merge({
            circleId: circle.id,
            userId: users.length ? users[Math.floor(Math.random() * users.length)].id : undefined,
          })
          .create()

        createdFolders.push(rootFolder)

        // 🔥 50% de chance d’avoir un sous-dossier
        if (Math.random() < 0.5) {
          const childFolder = await FolderFactory.apply('child')
            .merge({
              circleId: circle.id,
              userId: users.length ? users[Math.floor(Math.random() * users.length)].id : undefined,
              parentId: rootFolder.id, // ✅ On passe explicitement le parent ici
            })
            .create()

          createdFolders.push(childFolder)
        }
      }
    }

    console.log('✅ Dossiers créés avec hiérarchie !')
  }
}
