import User from '#models/user'
import Role from '#models/role'

export interface UserRepositoryContract {
  create(data: Partial<User>): Promise<User>
  update(userUuid: string, data: Partial<User>): Promise<User>
  delete(userUuid: string): Promise<void>
  findByUuid(userUuid: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  list(filters?: Record<string, any>): Promise<User[]>
  listRolesByUser(userUuid: string): Promise<Role[]>
  assignRole(userUuid: string, roleId: string): Promise<void>
  removeRole(userUuid: string, roleUuid: string): Promise<void>
}
