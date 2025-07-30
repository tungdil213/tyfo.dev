import Permission from '#models/permission'
import Role from '#models/role'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class RoleRepositoryContract extends BaseRepositoryContract<Role> {
  abstract findByName(name: string): Promise<Role | null>
  abstract getRolePermissions(roleId: number): Promise<Permission[]>
  abstract addPermissionToRole(roleId: number, permissionId: number): Promise<void>
  abstract removePermissionFromRole(roleId: number, permissionId: number): Promise<void>
  abstract hasPermission(roleId: number, permissionId: number): Promise<boolean>
  abstract createPermission(data: Partial<Permission>): Promise<Permission>
  abstract attachPermissionToRole(roleId: number, permissionId: number): Promise<void>
  abstract detachPermissionFromRole(roleId: number, permissionId: number): Promise<void>
}
