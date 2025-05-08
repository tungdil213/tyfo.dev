import { inject } from '@adonisjs/core'
import Permission from '#models/permission'
import { PermissionRepositoryContract } from '#repositories/contracts/permission_repository_contract'
import { PermissionServiceContract } from '#services/contracts/permission_service_contract'

@inject()
export default class PermissionService implements PermissionServiceContract {
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
