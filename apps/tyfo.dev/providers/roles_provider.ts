import logger from '@adonisjs/core/services/logger'
import { ApplicationService } from '@adonisjs/core/types'
import env from '#start/env'
import FakeRoleRepository from '#repositories/fake_role_repository'
import RoleRepository from '#repositories/role_repository'

export default class RolesProvider {
  constructor(protected app: ApplicationService) {}

  public async boot() {
    this.app.container.singleton(RoleRepository, () => {
      if (env.get('NODE_ENV') === 'test') {
        logger.info('Using FakeRoleRepository for tests')
        return new FakeRoleRepository()
      } else {
        logger.info('Using RoleRepository for production/development')
        return new RoleRepository()
      }
    })
  }
}
