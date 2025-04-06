import Log from '#models/log'
import { DateTime } from 'luxon'

export abstract class LogRepositoryContract {
  abstract findByUser(userId: number): Promise<Log[]>
  abstract findByAction(action: string): Promise<Log[]>
  abstract findByPrimaryObject(type: string, objectId: string): Promise<Log[]>
  abstract findByDateRange(startDate: DateTime, endDate: DateTime): Promise<Log[]>
  abstract countByAction(action: string): Promise<number>
}
