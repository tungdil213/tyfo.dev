// repositories/attribution_repository.ts
import { inject } from '@adonisjs/core'
import { AttributionRepositoryContract } from '#repositories/contracts/attribution_repository_contract'
import Attribution from '#models/attribution'
import Repository from './base/repository.js'
import Circle from '#models/circle'
import Role from '#models/role'
import User from '#models/user'

@inject()
export default class AttributionRepository
  extends Repository<Attribution>
  implements AttributionRepositoryContract
{
  constructor() {
    super(Attribution)
  }

  public async getUserAttributions(userId: number): Promise<Attribution[]> {
    return await Attribution.query().where('user_id', userId)
  }

  public async getCircleAttributions(circleId: number): Promise<Attribution[]> {
    return await Attribution.query().where('circle_id', circleId)
  }

  public async getRoleAttributions(roleId: number): Promise<Attribution[]> {
    return await Attribution.query().where('role_id', roleId)
  }

  public async getUserAttributionsInCircle(
    userId: number,
    circleId: number
  ): Promise<Attribution[]> {
    return await Attribution.query().where('user_id', userId).where('circle_id', circleId)
  }

  public async createAttribution(
    userId: number,
    roleId: number,
    circleId: number
  ): Promise<Attribution> {
    // Vérifier si l'attribution existe déjà
    const existingAttribution = await Attribution.query()
      .where('user_id', userId)
      .where('role_id', roleId)
      .where('circle_id', circleId)
      .first()

    if (existingAttribution) {
      return existingAttribution
    }

    // Vérifier si les entités existent
    const [user, role, circle] = await Promise.all([
      User.find(userId),
      Role.find(roleId),
      Circle.find(circleId),
    ])

    if (!user) throw new Error(`User with id ${userId} not found`)
    if (!role) throw new Error(`Role with id ${roleId} not found`)
    if (!circle) throw new Error(`Circle with id ${circleId} not found`)

    // Créer l'attribution
    return await Attribution.create({
      userId,
      roleId,
      circleId,
      uuid: crypto.randomUUID(),
    })
  }

  public async removeAttribution(userId: number, roleId: number, circleId: number): Promise<void> {
    await Attribution.query()
      .where('user_id', userId)
      .where('role_id', roleId)
      .where('circle_id', circleId)
      .delete()
  }

  public async hasAttribution(userId: number, roleId: number, circleId: number): Promise<boolean> {
    const attribution = await Attribution.query()
      .where('user_id', userId)
      .where('role_id', roleId)
      .where('circle_id', circleId)
      .first()

    return !!attribution
  }
}
