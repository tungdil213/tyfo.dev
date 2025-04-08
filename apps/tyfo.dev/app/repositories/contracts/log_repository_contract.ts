import Log from '#models/log'

import { DateTime } from 'luxon'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class LogRepositoryContract extends BaseRepositoryContract<Log> {
  abstract findByUser(userId: number): Promise<Log[]>
  abstract findByAction(action: string): Promise<Log[]>
  abstract findByPrimaryObject(type: string, objectId: string): Promise<Log[]>
  abstract findByDateRange(startDate: DateTime, endDate: DateTime): Promise<Log[]>
  abstract countByAction(action: string): Promise<number>
}
