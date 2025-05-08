import Permission from '#models/permission'
import { PermissionRepositoryContract } from '#repositories/contracts/permission_repository_contract'
import Repository from './base/repository.js'

export default class PermissionRepository
  extends Repository<Permission>
  implements PermissionRepositoryContract
{
  public async assignPermission(roleUuid: string, permission: string): Promise<void> {
    await Permission.create({ uuid: roleUuid, action: permission })
  }

  public async removePermission(roleUuid: string, permission: string): Promise<void> {
    await Permission.query().where('uuid', roleUuid).where('action', permission).delete()
  }

  public async checkUserPermission(userUuid: string, permission: string): Promise<boolean> {
    const result = await Permission.query()
      .join('roles', 'roles.uuid', 'permissions.role_uuid')
      .join('user_roles', 'user_roles.role_uuid', 'roles.uuid')
      .where('user_roles.user_id', userUuid)
      .where('permissions.action', permission)
      .first()

    return !!result
  }

  public async getRolePermissions(roleId: string): Promise<string[]> {
    const permissions = await Permission.query().where('uuid', roleId).select('action')

    return permissions.map((p) => p.action)
  }
}
