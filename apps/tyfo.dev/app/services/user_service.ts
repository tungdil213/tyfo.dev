import Circle from '#models/circle'
import Role from '#models/role'
import User from '#models/user'
import UserRepository from '#repositories/user_repository'
import { inject } from '@adonisjs/core'
import { BaseService } from './base_service_contract.js'
import { UserServiceContract } from './contracts/user_service_contract.js'
import NotFoundException from '#exceptions/not_found_exception'

@inject()
export default class UserService
  extends BaseService<User, UserRepository>
  implements UserServiceContract
{
  constructor(repository: UserRepository) {
    super(repository)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email)
  }

  async softDelete(uuid: string): Promise<void> {
    await this.repository.softDelete(uuid)
  }

  async restore(uuid: string): Promise<User> {
    const user = await this.repository.restore(uuid)
    return user
  }

  async getUserRoles(uuid: string): Promise<Role[]> {
    return this.repository.getUserRoles(uuid)
  }

  async getUserCircles(uuid: string): Promise<Circle[]> {
    return this.repository.getUserCircles(uuid)
  }

  /**
   * Create a new user
   */
  async createUser(data: Partial<User>): Promise<User> {
    return await User.create(data)
  }

  /**
   * Update an existing user by UUID
   */
  async updateUser(userUuid: string, data: Partial<User>): Promise<User> {
    const user = await this.repository.findByUuid(userUuid)

    if (!user) {
      throw new NotFoundException(`User with UUID ${userUuid} not found`)
    }

    user.merge(data)
    await user.save()

    return user
  }

  /**
   * Delete a user permanently (hard delete)
   */
  async deleteUser(userUuid: string): Promise<void> {
    const user = await this.repository.findByUuid(userUuid)

    if (!user) {
      throw new NotFoundException(`User with UUID ${userUuid} not found`)
    }

    await user.delete()
  }

  /**
   * Get a user by UUID or throw an exception if not found
   */
  async getUserByUuid(userUuid: string): Promise<User> {
    const user = await this.repository.findByUuid(userUuid)

    if (!user) {
      throw new NotFoundException(`User with UUID ${userUuid} not found`)
    }

    return user
  }

  /**
   * Assign a role to a user in a specific circle
   */
  async assignRole(userUuid: string, roleUuid: string, circleUuid: string): Promise<void> {
    // Note: This method would typically use an AttributionService or similar
    // For test purposes, we'll implement a simple version
    const user = await this.repository.findByUuid(userUuid)
    if (!user) {
      throw new NotFoundException(`User with UUID ${userUuid} not found`)
    }

    const role = await Role.findBy('uuid', roleUuid)
    const circle = await Circle.findBy('uuid', circleUuid)

    if (!role || !circle) {
      throw new NotFoundException('Role or circle not found')
    }

    // Créer l'attribution en utilisant le repository
    await this.repository.assignRoleToUser(userUuid, roleUuid, circleUuid)
  }

  /**
   * Remove a role from a user
   */
  async removeRole(userUuid: string, roleUuid: string): Promise<void> {
    const user = await this.repository.findByUuid(userUuid)
    if (!user) {
      throw new NotFoundException(`User with UUID ${userUuid} not found`)
    }

    const role = await Role.findBy('uuid', roleUuid)

    if (!role) {
      throw new NotFoundException('Role not found')
    }

    // Retirer le rôle en utilisant le repository
    await this.repository.removeRoleFromUser(userUuid, roleUuid)
  }

  /**
   * List users with optional filters
   */
  async listUsers(filters: Record<string, any>): Promise<User[]> {
    // Implementation depends on the repository capabilities
    // For simplicity, we'll use a basic approach
    let query = User.query()

    // Apply filters dynamically
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        query = query.where(key, value)
      }
    })

    return await query
  }

  /**
   * List roles for a specific user
   */
  async listRolesByUser(userUuid: string): Promise<Role[]> {
    return this.getUserRoles(userUuid)
  }
}
