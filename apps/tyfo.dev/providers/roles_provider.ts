import { ApplicationService } from '@adonisjs/core/types'
import RoleRepository from '#repositories/role_repository'

export default class RolesProvider {
  constructor(protected app: ApplicationService) {}

  public async boot() {
    this.app.container.singleton(RoleRepository, () => {
      return new RoleRepository()
    })
  }
}
