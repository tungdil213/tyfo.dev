import { inject } from '@adonisjs/core'
import { AttributionRepositoryContract } from '#repositories/contracts/attribution_repository_contract'
import Attribution from '#models/attribution'
import Repository from '#repositories/base/repository'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

@inject()
export default class AttributionRepository
  extends Repository<Attribution>
  implements AttributionRepositoryContract
{
  constructor() {
    super(Attribution)
  }

  public async getUserAttributions(userId: number): Promise<Attribution[]> {
    return Attribution.query().where('user_id', userId)
  }

  public async getCircleAttributions(circleId: number): Promise<Attribution[]> {
    return Attribution.query().where('circle_id', circleId)
  }

  public async getRoleAttributions(roleId: number): Promise<Attribution[]> {
    return Attribution.query().where('role_id', roleId)
  }

  public async getRolesAttributionsInCircle(
    userId: number,
    circleId: number
  ): Promise<Attribution[]> {
    return Attribution.query().where('user_id', userId).where('circle_id', circleId).preload('role')
  }
  public async getUsersAttributionsInCircle(circleId: number): Promise<Attribution[]> {
    return Attribution.query().where('circle_id', circleId).preload('user')
  }

  public async hasAttribution(userId: number, roleId: number, circleId: number): Promise<boolean> {
    const result = await this.findByUserRoleAndCircle(userId, roleId, circleId)
    return !!result
  }

  public async findByUserRoleAndCircle(
    userId: number,
    roleId: number,
    circleId: number
  ): Promise<Attribution | null> {
    return Attribution.query()
      .where('user_id', userId)
      .where('role_id', roleId)
      .where('circle_id', circleId)
      .first()
  }

  public async removeAttribution(userId: number, roleId: number, circleId: number): Promise<void> {
    await Attribution.query()
      .where('user_id', userId)
      .where('role_id', roleId)
      .where('circle_id', circleId)
      .delete()
  }
}
