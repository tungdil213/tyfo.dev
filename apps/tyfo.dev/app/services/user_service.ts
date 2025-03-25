// services/user_service.ts
import { inject } from '@adonisjs/core'
import { UserRepositoryContract } from '#contracts/user_repository_contract'
import User from '#models/user'
import { RoleRepositoryContract } from '#contracts/role_repository_contract'

@inject()
export default class UserService {
  constructor(
    private userRepository: UserRepositoryContract,
    private roleRepository: RoleRepositoryContract
  ) {}

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
}
