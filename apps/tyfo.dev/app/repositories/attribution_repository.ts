// repositories/attribution_repository.ts
import { inject } from '@adonisjs/core'
import { AttributionRepositoryContract } from '#repositories/contracts/attribution_repository_contract'
import Attribution from '#models/attribution'

@inject()
export default class AttributionRepository implements AttributionRepositoryContract {
  /**
   * Create a new attribution
   */
  public async create(data: Partial<Attribution>): Promise<Attribution> {
    return await Attribution.create(data)
  }

  /**
   * Find an attribution by UUID
   */
  public async findByUuid(uuid: string): Promise<Attribution | null> {
    return await Attribution.query().where('uuid', uuid).first()
  }

  /**
   * Find an attribution by the combination of user, role and circle
   */
  public async findByUserRoleCircle(
    userId: number,
    roleId: number,
    circleId: number
  ): Promise<Attribution | null> {
    return await Attribution.query()
      .where('user_id', userId)
      .where('role_id', roleId)
      .where('circle_id', circleId)
      .first()
  }

  /**
   * List attributions for a specific user
   */
  public async listByUser(userId: number, filters?: Record<string, any>): Promise<Attribution[]> {
    const query = Attribution.query().where('user_id', userId)

    if (filters) {
      if (filters.roleId) {
        query.where('role_id', filters.roleId)
      }

      if (filters.circleId) {
        query.where('circle_id', filters.circleId)
      }
    }

    return await query.preload('role').preload('circle').exec()
  }

  /**
   * List attributions for a specific role
   */
  public async listByRole(roleId: number, filters?: Record<string, any>): Promise<Attribution[]> {
    const query = Attribution.query().where('role_id', roleId)

    if (filters) {
      if (filters.userId) {
        query.where('user_id', filters.userId)
      }

      if (filters.circleId) {
        query.where('circle_id', filters.circleId)
      }
    }

    return await query.preload('user').preload('circle').exec()
  }

  /**
   * List attributions for a specific circle
   */
  public async listByCircle(
    circleId: number,
    filters?: Record<string, any>
  ): Promise<Attribution[]> {
    const query = Attribution.query().where('circle_id', circleId)

    if (filters) {
      if (filters.userId) {
        query.where('user_id', filters.userId)
      }

      if (filters.roleId) {
        query.where('role_id', filters.roleId)
      }
    }

    return await query.preload('user').preload('role').exec()
  }

  /**
   * Remove an attribution by UUID
   */
  public async remove(uuid: string): Promise<void> {
    const attribution = await this.findByUuid(uuid)
    if (!attribution) {
      return
    }
    await attribution.delete()
  }
}
