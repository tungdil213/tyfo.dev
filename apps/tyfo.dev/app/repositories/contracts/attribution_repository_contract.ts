// repositories/contracts/attribution_repository_contract.ts
import Attribution from '#models/attribution'

export interface AttributionRepositoryContract {
  create(data: Partial<Attribution>): Promise<Attribution>
  findByUuid(uuid: string): Promise<Attribution | null>
  findByUserRoleCircle(
    userId: number,
    roleId: number,
    circleId: number
  ): Promise<Attribution | null>
  listByUser(userId: number, filters?: Record<string, any>): Promise<Attribution[]>
  listByRole(roleId: number, filters?: Record<string, any>): Promise<Attribution[]>
  listByCircle(circleId: number, filters?: Record<string, any>): Promise<Attribution[]>
  remove(uuid: string): Promise<void>
}
