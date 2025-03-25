import Role from '#models/role'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'

export default class RoleRepository implements RoleRepositoryContract {
  public async create(data: Partial<Role>): Promise<Role> {
    return await Role.create(data)
  }

  public async findByName(name: string): Promise<Role | null> {
    return await Role.findBy('name', name)
  }

  public async list(
    filters?: Partial<{
      circleUuid: string
      roleUuid: string
      userId: number
      objectUuid: string
      folderUuid: string
    }>
  ): Promise<Role[]> {
    let query = Role.query()

    if (filters?.circleUuid) query = query.where('circle_uuid', filters.circleUuid)
    if (filters?.roleUuid) query = query.where('role_uuid', filters.roleUuid)
    if (filters?.userId) query = query.where('user_id', filters.userId)
    if (filters?.objectUuid) query = query.where('object_uuid', filters.objectUuid)
    if (filters?.folderUuid) query = query.where('folder_uuid', filters.folderUuid)

    return await query
  }

  public async update(roleUuid: string, data: Partial<Role>): Promise<Role> {
    return await Role.query().where('uuid', roleUuid).update(data).firstOrFail()
  }

  public async delete(roleUuid: string): Promise<void> {
    await Role.query().where('uuid', roleUuid).delete()
  }

  public async findByUuid(roleUuid: string): Promise<Role | null> {
    return await Role.findBy('uuid', roleUuid)
  }

  public async listRolesByCircleUuid(circleUuid: string): Promise<Role[]> {
    return await this.roleRepository.list({ circleUuid })
  }

  public async listRolesByCircleAndUser(circleUuid: string, userId: number): Promise<Role[]> {
    return await this.roleRepository.list({ circleUuid, userId })
  }

  public async listRolesByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Role[]> {
    return await this.roleRepository.list({ circleUuid, roleUuid })
  }
}
