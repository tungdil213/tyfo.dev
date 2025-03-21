export interface RoleServiceContract {
  assignRole(userId: string, roleId: string): Promise<void>
  removeRole(userId: string, roleId: string): Promise<void>
  listRoles(): Promise<{ id: string; name: string }[]>
  getRolePermissions(roleId: string): Promise<string[]>
}
