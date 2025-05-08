import Circle from '#models/circle'
import Role from '#models/role'
import User from '#models/user'
import UserRepository from '#repositories/user_repository'
import { inject } from '@adonisjs/core'
import { BaseService } from './base_service_contract.js'

@inject()
export default class UserService extends BaseService<User, UserRepository> {
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
}
