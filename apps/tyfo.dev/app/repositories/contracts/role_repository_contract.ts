import Role from '#models/role'

export abstract class RoleRepositoryContract {
  abstract create(data: Partial<Role>): Promise<Role>
  abstract update(roleUuid: string, data: Partial<Role>): Promise<Role>
  abstract delete(roleUuid: string): Promise<void>
  abstract findByUuid(roleUuid: string): Promise<Role | null>
  abstract findByName(name: string): Promise<Role | null>
  abstract list(): Promise<Role[]>
  abstract listByCircleUuid(circleUuid: string): Promise<Role[]>
  abstract listByCircleAndUser(circleUuid: string, userId: number): Promise<Role[]>
  abstract listByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Role[]>
  abstract listByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Role[]>
}
