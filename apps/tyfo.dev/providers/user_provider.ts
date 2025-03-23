import FakeUserRepository from '#repositories/fake_user_repository'
import UserRepository from '#repositories/user_repository'
import logger from '@adonisjs/core/services/logger'
import { ApplicationService } from '@adonisjs/core/types'
import env from '#start/env'

export default class UsersProvider {
  constructor(protected app: ApplicationService) {}

  public async boot() {
    this.app.container.singleton(UserRepository, () => {
      if (env.get('NODE_ENV') === 'test') {
        logger.info('Using FakeUserRepository for tests')
        return new FakeUserRepository()
      } else {
        logger.info('Using UserRepository for production/development')
        return new UserRepository()
      }
    })
  }
}
