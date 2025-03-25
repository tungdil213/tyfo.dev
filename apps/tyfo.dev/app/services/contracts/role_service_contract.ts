import Role from '#models/role'

export interface RoleServiceContract {
  assignRole(userId: string, roleId: string): Promise<void>
  removeRole(userId: string, roleId: string): Promise<void>
  assignPermission(roleUuid: string, permission: string): Promise<void>
  removePermission(roleUuid: string, permission: string): Promise<void>
  checkUserPermission(userUuid: string, permission: string): Promise<boolean>
  listRoles(): Promise<{ id: string; name: string }[]>
  getRolePermissions(roleId: string): Promise<string[]>
  listRolesByCircleUuid(circleUuid: string): Promise<Role[]>
  listRolesByCircleAndUser(circleUuid: string, userId: number): Promise<Role[]>
  listRolesByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Role[]>
  listRolesByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Role[]>
}
