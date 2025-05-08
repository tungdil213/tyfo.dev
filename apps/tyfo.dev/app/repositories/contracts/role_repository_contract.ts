import Permission from '#models/permission'
import Role from '#models/role'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class RoleRepositoryContract extends BaseRepositoryContract<Role> {
  abstract findByName(name: string): Promise<Role | null>
  abstract getRolePermissions(roleId: number): Promise<Permission[]>
}
