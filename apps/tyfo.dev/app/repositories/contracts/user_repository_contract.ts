import User from '#models/user'
import Role from '#models/role'
import Attribution from '#models/attribution'
import Circle from '#models/circle'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export interface UserRepositoryContract extends BaseRepositoryContract<User> {
  findByEmail(email: string): Promise<User | null>
  softDelete(uuid: string): Promise<void>
  restore(uuid: string): Promise<User>
  getUserRoles(uuid: string): Promise<Role[]>
  getUserAttributions(uuid: string): Promise<Attribution[]>
  getUserCircles(uuid: string): Promise<Circle[]>
}
