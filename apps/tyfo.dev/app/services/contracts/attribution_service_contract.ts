import User from '#models/user'
import Role from '#models/role'
import Attribution from '#models/attribution'

export interface AttributionServiceContract {
  assignRoleToUser(userId: number, roleId: number, circleId: number): Promise<Attribution>

  removeRoleFromUser(userId: number, roleId: number, circleId: number): Promise<void>

  getUserRolesInCircle(userId: number, circleId: number): Promise<Role[]>

  getUserInCircle(userId: number, circleId: number): Promise<User[]>

  getUsersAttributionsInCircle(userId: number, circleId: number): Promise<User[]>
}
