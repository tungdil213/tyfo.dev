import Attribution from '#models/attribution'
import Circle from '#models/circle'
import User from '#models/user'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class CircleRepositoryContract extends BaseRepositoryContract<Circle> {
  abstract findByName(name: string): Promise<Circle | null>
  abstract getCircleUsers(circleId: number): Promise<User[]>
  abstract getCircleAttributions(circleId: number): Promise<Attribution[]>
  abstract archiveCircle(id: number): Promise<Circle>
  abstract restoreCircle(id: number): Promise<Circle>
}
