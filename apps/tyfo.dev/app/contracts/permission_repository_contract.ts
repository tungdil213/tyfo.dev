import Permission from '#models/permission'

export abstract class PermissionRepositoryContract {
  abstract create(data: Partial<Permission>): Promise<Permission>
  abstract findByAction(action: string): Promise<Permission | null>
  abstract list(): Promise<Permission[]>
}
