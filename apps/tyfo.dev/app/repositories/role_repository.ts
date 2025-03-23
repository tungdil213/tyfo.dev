// repositories/role_repository.ts
import Role from '#models/role'
import { RoleRepositoryContract } from '#contracts/role_repository_contract'

export default class RoleRepository implements RoleRepositoryContract {
  public async create(data: Partial<Role>): Promise<Role> {
    return await Role.create(data)
  }

  public async findByName(name: string): Promise<Role | null> {
    return await Role.findBy('name', name)
  }
}
