import UserService from '#services/user_service'
import type { ApplicationService } from '@adonisjs/core/types'
import { UserServiceContract } from '#contracts/user_service_contract'

export default class UsersProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The container bindings have booted
   */
  async boot() {
    this.app.container.bind('UserServiceContract', () => new UserService())
  }
}
