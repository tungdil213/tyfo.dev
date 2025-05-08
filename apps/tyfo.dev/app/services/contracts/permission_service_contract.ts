import Permission from '#models/permission'

export interface PermissionServiceContract {
  createPermission(data: Partial<Permission>): Promise<Permission>
  getPermissionByAction(action: string): Promise<Permission | null>
  listPermissions(): Promise<Permission[]>
}
