// services/attribution_service.ts
import { inject } from '@adonisjs/core'

import { BaseService } from '#services/base_service_contract'
import Attribution from '#models/attribution'
import Role from '#models/role'
import AttributionRepository from '#repositories/attribution_repository'
import CircleRepository from '#repositories/circle_repository'
import RoleRepository from '#repositories/role_repository'
import UserRepository from '#repositories/user_repository'
import User from '#models/user'
import { AttributionServiceContract } from './contracts/attribution_service_contract.js'

@inject()
export default class AttributionService
  extends BaseService<Attribution, AttributionRepository>
  implements AttributionServiceContract
{
  constructor(
    repository: AttributionRepository,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private circleRepository: CircleRepository
  ) {
    super(repository)
  }
  getUserRolesInCircle(userId: number, circleId: number): Promise<Role[]> {
    throw new Error('Method not implemented.')
  }
  getUsersAttributionsInCircle(userId: number, circleId: number): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
  getUserInCircle(userId: number, circleId: number): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
  async assignRoleToUser(userId: number, roleId: number, circleId: number): Promise<Attribution> {
    // Vérifier l'existence des entités référencées
    await Promise.all([
      this.userRepository.findByIdOrFail(userId),
      this.roleRepository.findByIdOrFail(roleId),
      this.circleRepository.findByIdOrFail(circleId),
    ])

    // Empêcher les doublons
    const exists = await this.repository.hasAttribution(userId, roleId, circleId)
    if (exists) {
      const existing = await this.repository.findByUserRoleAndCircle(userId, roleId, circleId)
      return existing!
    }

    // Créer l'attribution (uuid généré par le hook @beforeCreate)
    return this.repository.create({ userId, roleId, circleId })
  }

  async removeRoleFromUser(userId: number, roleId: number, circleId: number): Promise<void> {
    await this.repository.removeAttribution(userId, roleId, circleId)
  }

  async getRolesInCircle(userId: number, circleId: number): Promise<Role[]> {
    const attributions = await this.repository.getRolesAttributionsInCircle(userId, circleId)
    return attributions.map((attr) => {
      return attr.role
    })
  }

  async getUsersInCircle(circleId: number): Promise<User[]> {
    const attributions = await this.repository.getUsersAttributionsInCircle(circleId)
    return attributions.map((attr) => {
      return attr.user
    })
  }
}
