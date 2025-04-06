import Circle from '#models/circle'
import Role from '#models/role'
import User from '#models/user'
import UserRepository from '#repositories/user_repository'
import { BaseService } from './base_service_contract.js'
import { LogService } from './log_service.js'

export class UserService extends BaseService<User, UserRepository> {
  constructor(
    repository: UserRepository,
    private logService: LogService
  ) {
    super(repository)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email)
  }

  async softDelete(uuid: string): Promise<void> {
    await this.repository.softDelete(uuid)
    await this.logService.logAction({
      userId: uuid,
      action: 'USER_SOFT_DELETE',
      primaryType: 'USER',
      primaryObject: uuid,
      message: 'User has been soft deleted',
    })
  }

  async restore(uuid: string): Promise<User> {
    const user = await this.repository.restore(uuid)
    await this.logService.logAction({
      userId: uuid,
      action: 'USER_RESTORE',
      primaryType: 'USER',
      primaryObject: uuid,
      message: 'User has been restored',
    })
    return user
  }

  async getUserRoles(uuid: string): Promise<Role[]> {
    return this.repository.getUserRoles(uuid)
  }

  async getUserCircles(uuid: string): Promise<Circle[]> {
    return this.repository.getUserCircles(uuid)
  }
}
