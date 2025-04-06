import Attribution from '#models/attribution'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class AttributionRepositoryContract extends BaseRepositoryContract<Attribution> {
  abstract getUserAttributions(userId: number): Promise<Attribution[]>
  abstract getCircleAttributions(circleId: number): Promise<Attribution[]>
  abstract getRoleAttributions(roleId: number): Promise<Attribution[]>
  abstract getUserAttributionsInCircle(userId: number, circleId: number): Promise<Attribution[]>
  abstract createAttribution(userId: number, roleId: number, circleId: number): Promise<Attribution>
  abstract removeAttribution(userId: number, roleId: number, circleId: number): Promise<void>
  abstract hasAttribution(userId: number, roleId: number, circleId: number): Promise<boolean>
}
