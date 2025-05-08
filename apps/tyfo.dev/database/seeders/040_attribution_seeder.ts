import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import User from '#models/user'
import Circle from '#models/circle'
import Permission from '#models/permission'
import Attribution from '#models/attribution'
import { generateUuid } from '#utils/uuid_helper'

export default class AttributionSeeder extends BaseSeeder {
  public async run() {
    console.log('🔹 Attribution des rôles aux utilisateurs...')

    const users = await User.all()
    const roles = await Role.all()
    const circles = await Circle.all()
    const permissions = await Permission.all()

    if (!users.length || !roles.length || !circles.length || !permissions.length) {
      console.warn(
        '⚠️ Manque d’utilisateurs, de rôles, de cercles ou de permissions. Vérifie tes seeders.'
      )
      return
    }

    // 🔹 Attribuer des rôles et cercles aux utilisateurs
    await Promise.all(
      users.map(async (user) => {
        const randomRole = roles[Math.floor(Math.random() * roles.length)]
        const randomCircle = circles[Math.floor(Math.random() * circles.length)]

        await Attribution.updateOrCreate(
          { userId: user.id, roleId: randomRole.id, circleId: randomCircle.id },
          { uuid: generateUuid() }
        )

        console.log(
          `✅ Utilisateur ${user.email} -> Rôle ${randomRole.name} -> Cercle ${randomCircle.name}`
        )
      })
    )

    // 🔹 Attribution des permissions aux rôles
    const roleMap: Record<string, string[]> = {
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

    await Promise.all(
      roles.map(async (role) => {
        const permissionsToAssign = permissions.filter((p) =>
          roleMap[role.name]?.includes(p.action)
        )

        await role.related('permissions').attach(
          permissionsToAssign.reduce<Record<number, { role_permission_uuid: string }>>(
            (acc, permission) => {
              acc[permission.id] = { role_permission_uuid: generateUuid() }
              return acc
            },
            {}
          )
        )

        console.log(`✅ Rôle ${role.name} a ${permissionsToAssign.length} permissions`)
      })
    )

    console.log('✅ Attribution terminée !')
  }
}
