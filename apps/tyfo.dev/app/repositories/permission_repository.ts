import Permission from '#models/permission'
import { PermissionRepositoryContract } from '#contracts/permission_repository_contract'

export default class PermissionRepository implements PermissionRepositoryContract {
  public async create(data: Partial<Permission>): Promise<Permission> {
    return await Permission.create(data)
  }

  public async findByAction(action: string): Promise<Permission | null> {
    return await Permission.findBy('action', action)
  }

  public async list(): Promise<Permission[]> {
    return await Permission.all()
  }
}
