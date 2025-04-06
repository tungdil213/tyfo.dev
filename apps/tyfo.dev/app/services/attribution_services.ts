// services/attribution_service.ts
import { inject } from '@adonisjs/core'

import { BaseService } from '#services/base_service_contract'
import { CreateLogParams } from '#services/contracts/log_service_contract'
import { LogService } from '#services/log_service'
import Attribution from '#models/attribution'
import Role from '#models/role'
import AttributionRepository from '#repositories/attribution_repository'
import CircleRepository from '#repositories/circle_repository'
import RoleRepository from '#repositories/role_repository'
import UserRepository from '#repositories/user_repository'

@inject()
export class AttributionService extends BaseService<Attribution, AttributionRepository> {
  constructor(
    repository: AttributionRepository,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private circleRepository: CircleRepository,
    private logService: LogService
  ) {
    super(repository)
  }

  async assignRoleToUser(userId: number, roleId: number, circleId: number): Promise<Attribution> {
    // Vérifier si l'attribution existe déjà
    const existing = await this.repository.findByUserAndRole(userId, roleId, circleId)
    if (existing) {
      return existing
    }

    // Vérifier l'existence des entités référencées
    const [user, role, circle] = await Promise.all([
      this.userRepository.findById(userId),
      this.roleRepository.findById(roleId),
      this.circleRepository.findById(circleId),
    ])

    if (!user || !role || !circle) {
      throw new Error('Referenced entity does not exist')
    }

    const attribution = await this.repository.create({
      userId,
      roleId,
      circleId,
    })

    await this.logService.logAction({
      userId,
      action: 'ROLE_ASSIGNED',
      primaryType: 'USER',
      primaryObject: userId.toString(),
      secondaryType: 'ROLE',
      secondaryObject: roleId.toString(),
      message: `Role ${role.name} assigned to user in circle ${circle.name}`,
    })

    return attribution
  }

  async removeRoleFromUser(userId: number, roleId: number, circleId: number): Promise<void> {
    const attribution = await this.repository.findByUserAndRole(userId, roleId, circleId)
    if (!attribution) {
      return
    }

    await this.repository.delete(attribution.id)

    await this.logService.logAction({
      userId,
      action: 'ROLE_REMOVED',
      primaryType: 'USER',
      primaryObject: userId.toString(),
      secondaryType: 'ROLE',
      secondaryObject: roleId.toString(),
      message: 'Role removed from user',
    })
  }

  async getUserRolesInCircle(userId: number, circleId: number): Promise<Role[]> {
    const attributions = await this.repository.findByUserAndCircle(userId, circleId)
    // Implémenter la logique pour récupérer les rôles à partir des attributions
    // ...
    return [] // À compléter
  }
}
