// services/user_service.ts
import { inject } from '@adonisjs/core'
import { UserRepositoryContract } from '#repositories/contracts/user_repository_contract'
import User from '#models/user'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import { UserServiceContract } from './contracts/user_service_contract.js'
import Role from '#models/role'

@inject()
export default class UserService implements UserServiceContract {
  constructor(
    private userRepository: UserRepositoryContract,
    private roleRepository: RoleRepositoryContract
  ) {}
  getUserById(userId: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  public async createUser(data: Partial<User>): Promise<User> {
    return await this.userRepository.create(data)
  }

  public async updateUser(userUuid: string, data: Partial<User>): Promise<User> {
    return await this.userRepository.update(userUuid, data)
  }

  public async deleteUser(userUuid: string): Promise<void> {
    await this.userRepository.delete(userUuid)
  }

  public async getUserByUuid(userUuid: string): Promise<User> {
    const user = await this.userRepository.findByUuid(userUuid)
    if (!user) throw new Error('Utilisateur non trouvé')
    return user
  }

  public async listUsers(filters: Record<string, any>): Promise<User[]> {
    if (filters.role) {
      const role = await this.roleRepository.findByName(filters.role)
      if (!role) return []
      return await this.userRepository.list({ roleId: role.id })
    }
    return await this.userRepository.list(filters)
  }

  getUserByUuid(userId: string): Promise<User> {
    return this.userRepository.findByUuid(userId)
  }
  assignRole(userUuid: string, roleUuid: string): Promise<void> {
    return this.userRepository.assignRole(userUuid, roleUuid)
  }
  removeRole(userUuid: string, roleUuid: string): Promise<void> {
    return this.userRepository.removeRole(userUuid, roleUuid)
  }
  listRolesByUser(userUuid: string): Promise<Role[]> {
    return this.userRepository.listRolesByUser(userUuid)
  }
  listRolesByCircle(circleUuid: string): Promise<Role[]> {
    return this.userRepository.listRolesByCircle(circleUuid)
  }
}
