import Role from '#models/role'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import { RoleServiceContract } from '#services/contracts/role_service_contract'

export default class RoleService implements RoleServiceContract {
  constructor(private roleRepository: RoleRepositoryContract) {}
  assignRole(userId: string, roleId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  removeRole(userId: string, roleId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  assignPermission(roleUuid: string, permission: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  removePermission(roleUuid: string, permission: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  checkUserPermission(userUuid: string, permission: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  listRoles(): Promise<{ id: string; name: string }[]> {
    throw new Error('Method not implemented.')
  }
  getRolePermissions(roleId: string): Promise<string[]> {
    throw new Error('Method not implemented.')
  }
  listRolesByCircleUuid(circleUuid: string): Promise<Role[]> {
    throw new Error('Method not implemented.')
  }
  listRolesByCircleAndUser(circleUuid: string, userId: number): Promise<Role[]> {
    throw new Error('Method not implemented.')
  }
  listRolesByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Role[]> {
    throw new Error('Method not implemented.')
  }
  listRolesByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Role[]> {
    throw new Error('Method not implemented.')
  }
}
