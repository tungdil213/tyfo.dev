import { inject } from '@adonisjs/core'
import Permission from '#models/permission'
import { PermissionRepositoryContract } from '#contracts/permission_repository_contract'

@inject()
export default class PermissionService {
  constructor(private permissionRepository: PermissionRepositoryContract) {}

  public async createPermission(data: Partial<Permission>): Promise<Permission> {
    return await this.permissionRepository.create(data)
  }

  public async getPermissionByAction(action: string): Promise<Permission | null> {
    return await this.permissionRepository.findByAction(action)
  }

  public async listPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.list()
  }
}
