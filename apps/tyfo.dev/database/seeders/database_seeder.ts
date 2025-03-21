import { AttributionFactory } from '#factories/attribution_factory'
import { CircleFactory } from '#factories/circle_factory'
import { FolderFactory } from '#factories/folder_factory'
import { LogFactory } from '#factories/log_factory'
import { NotificationFactory } from '#factories/notification_factory'
import { ObjectModelFactory } from '#factories/object_model_factory'
import { PermissionFactory } from '#factories/permission_factory'
import { RoleFactory } from '#factories/role_factory'
import { UserFactory } from '#factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Initialisation des seeds...')

    // 1️⃣ Création des rôles
    console.log('🔹 Création des rôles...')
    const roles = await RoleFactory.merge([
      { name: 'Admin', description: 'Accès total' },
      { name: 'Prestataire', description: 'Gère les cercles et les attributions' },
      { name: 'Consommateur', description: 'Accès limité aux documents' },
    ]).createMany(3)

    // 2️⃣ Assignation des permissions aux rôles
    console.log('🔹 Assignation des permissions aux rôles...')
    const actionsByRole: Record<string, string[]> = {
      Admin: [
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
      ],
      Prestataire: [
        'CREATE_CIRCLE',
        'MANAGE_USERS',
        'VIEW_DOCUMENTS',
        'UPLOAD_FILES',
        'EDIT_DOCUMENTS',
      ],
      Consommateur: ['VIEW_DOCUMENTS', 'UPLOAD_FILES'],
    }

    for (const role of roles) {
      const actions = actionsByRole[role.name] || []
      for (const action of actions) {
        await PermissionFactory.merge({
          roleId: role.id, // 🟢 Associer à un rôle existant
          action,
        }).create()
      }
    }

    console.log('✅ Permissions assignées !')

    // 3️⃣ Création des utilisateurs
    console.log('🔹 Création des utilisateurs...')
    const users = await UserFactory.createMany(10)

    // 4️⃣ Création des cercles avec assignation d'un propriétaire
    console.log('🔹 Création des cercles...')
    const circles = await Promise.all(
      users.slice(0, 5).map(async (user) => {
        return await CircleFactory.merge({ userId: user.id }).create()
      })
    )

    // 5️⃣ Attribution des rôles aux utilisateurs
    console.log('🔹 Attribution des rôles...')
    for (const user of users) {
      for (let i = 0; i < 2; i++) {
        const randomCircle = circles[Math.floor(Math.random() * circles.length)]
        const randomRole = roles[Math.floor(Math.random() * roles.length)]

        await AttributionFactory.merge({
          roleId: randomRole.id,
          circleId: randomCircle.id,
          userId: user.id,
        }).create()
      }
    }

    // 6️⃣ Création des dossiers et fichiers
    const folders = await Promise.all(
      circles.map(async (circle) => {
        return await FolderFactory.merge({
          circleId: circle.id,
          userId: circle.userId, // Vérifie que `userId` est bien renseigné
        }).createMany(3)
      })
    ).then((res) => res.flat()) // Aplatir le tableau de promesses pour avoir Folder[]

    console.log('✅ Dossiers créés !')

    // ✅ Vérifier que chaque `folder` a bien un `userId` avant de créer des fichiers
    await Promise.all(
      folders.map(async (folder) => {
        if (!folder.userId) {
          console.warn(`⚠️  Folder ${folder.id} n'a pas de userId, il sera ignoré.`)
          return
        }

        await ObjectModelFactory.merge({
          folderId: folder.id,
          userId: folder.userId,
        }).createMany(2)
      })
    )

    // 7️⃣ Génération de logs et notifications
    console.log('🔹 Génération des logs et notifications...')
    await LogFactory.with('user').createMany(30)
    await NotificationFactory.with('recipient').createMany(15)

    console.log('✅ Seeds terminés avec succès !')
  }
}
