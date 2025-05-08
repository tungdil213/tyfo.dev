import Role from '#models/role'
import User from '#models/user'

export interface UserServiceContract {
  createUser(data: Partial<User>): Promise<User>
  updateUser(userId: string, data: Partial<User>): Promise<User>
  deleteUser(userId: string): Promise<void>
  getUserByUuid(userUuid: string): Promise<User>
  assignRole(userUuid: string, roleUuid: string, circleUuid: string): Promise<void>
  removeRole(userUuid: string, roleUuid: string): Promise<void>
  listUsers(filters: Record<string, any>): Promise<User[]>
  listRolesByUser(userUuid: string): Promise<Role[]>
}
