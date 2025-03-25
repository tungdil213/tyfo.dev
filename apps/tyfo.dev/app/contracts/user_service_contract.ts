import User from '#models/user'

export interface UserServiceContract {
  createUser(data: Partial<User>): Promise<User>
  updateUser(userId: string, data: Partial<User>): Promise<User>
  deleteUser(userId: string): Promise<void>
  getUserById(userId: string): Promise<User>
  listUsers(filters: Record<string, any>): Promise<User[]>
}
