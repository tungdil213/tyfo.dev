import Role from '#models/role'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'

export default class RoleRepository implements RoleRepositoryContract {
  public async create(data: Partial<Role>): Promise<Role> {
    return await Role.create(data)
  }

  public async findByName(name: string): Promise<Role | null> {
    return await Role.findBy('name', name)
  }

  public async list(): Promise<Role[]> {
    return await Role.all()
  }

  public async listByCircleUuid(circleUuid: string): Promise<Role[]> {
    return await Role.query().where('circle_uuid', circleUuid)
  }

  public async listByCircleAndUser(circleUuid: string, userId: number): Promise<Role[]> {
    return await Role.query().where('circle_uuid', circleUuid).where('user_id', userId)
  }

  public async listByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Role[]> {
    return await Role.query()
      .where('circle_uuid', circleUuid)
      .where('role_uuid', roleUuid)
      .where('user_id', userId)
  }

  public async listByCircleAndRoleAndUserAndObject(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string
  ): Promise<Role[]> {
    return await Role.query()
      .where('circle_uuid', circleUuid)
      .where('role_uuid', roleUuid)
      .where('user_id', userId)
      .where('object_uuid', objectUuid)
  }

  public async listByCircleAndRoleAndUserAndObjectAndFolder(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string,
    folderUuid: string
  ): Promise<Role[]> {
    return await Role.query()
      .where('circle_uuid', circleUuid)
      .where('role_uuid', roleUuid)
      .where('user_id', userId)
      .where('object_uuid', objectUuid)
      .where('folder_uuid', folderUuid)
  }

  async update(roleUuid: string, data: Partial<Role>): Promise<Role> {
    return await Role.query().where('uuid', roleUuid).update(data).firstOrFail()
  }
  async delete(roleUuid: string): Promise<void> {
    await Role.query().where('uuid', roleUuid).delete()
  }
  async findByUuid(roleUuid: string): Promise<Role | null> {
    return await Role.findBy('uuid', roleUuid)
  }
  async listByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Role[]> {
    return await Role.query().where('circle_uuid', circleUuid).where('role_uuid', roleUuid)
  }
}
