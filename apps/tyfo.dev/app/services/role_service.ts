import { inject } from '@adonisjs/core'
import Role from '#models/role'
import { RoleRepositoryContract } from '#contracts/role_repository_contract'

@inject()
export default class RoleService {
  constructor(private roleRepository: RoleRepositoryContract) {}

  public async createRole(data: Partial<Role>): Promise<Role> {
    return await this.roleRepository.create(data)
  }

  public async getRoleByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findByName(name)
  }

  public async listRoles(): Promise<Role[]> {
    return await this.roleRepository.list()
  }
}
