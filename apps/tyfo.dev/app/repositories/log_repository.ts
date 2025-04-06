import Log from '#models/log'
import { LogRepositoryContract } from '#repositories/contracts/log_repository_contract'
import { DateTime } from 'luxon'

export default class LogRepository implements LogRepositoryContract {
  constructor() {}

  public async findByUser(userId: number): Promise<Log[]> {
    return await Log.query().where('user_id', userId).orderBy('created_at', 'desc')
  }

  public async findByAction(action: string): Promise<Log[]> {
    return await Log.query().where('action', action).orderBy('created_at', 'desc')
  }

  public async findByPrimaryObject(type: string, objectId: string): Promise<Log[]> {
    return await Log.query()
      .where('primary_type', type)
      .where('primary_object', objectId)
      .orderBy('created_at', 'desc')
  }

  public async findByDateRange(startDate: DateTime, endDate: DateTime): Promise<Log[]> {
    // Convert to ISO string format and ensure it's not null
    const start = startDate.isValid
      ? startDate.toISO() || startDate.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZ")
      : startDate.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZ")
    const end = endDate.isValid
      ? endDate.toISO() || endDate.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZ")
      : endDate.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZ")

    return await Log.query().whereBetween('created_at', [start, end]).orderBy('created_at', 'desc')
  }

  public async countByAction(action: string): Promise<number> {
    const result = await Log.query().where('action', action).count('* as total').first()
    return result ? Number(result.$extras.total) : 0
  }
}
