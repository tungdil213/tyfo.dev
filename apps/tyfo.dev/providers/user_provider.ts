import UserRepository from '#repositories/user_repository'
import { ApplicationService } from '@adonisjs/core/types'

export default class UsersProvider {
  constructor(protected app: ApplicationService) {}

  public async boot() {
    this.app.container.singleton(UserRepository, () => {
      return new UserRepository()
    })
  }
}
