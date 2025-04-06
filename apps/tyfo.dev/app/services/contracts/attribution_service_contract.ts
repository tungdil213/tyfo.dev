import User from '#models/user'
import Role from '#models/role'

export interface AttributionServiceContract {
  assignRole(userUuid: string, roleUuid: string, circleUuid: string): Promise<void>
  removeRole(userUuid: string, roleUuid: string): Promise<void>
  listRolesByUser(userUuid: string): Promise<Role[]>
  listUsersByRoleAndCircle(roleUuid: string, circleUuid: string): Promise<User[]>
}
