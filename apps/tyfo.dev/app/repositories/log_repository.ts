import Log from '#models/log'
import { DateTime } from 'luxon'
import { LogRepositoryContract } from '#repositories/contracts/log_repository_contract'
import Repository from '#repositories/base/repository'

import { inject } from '@adonisjs/core'

@inject()
export default class LogRepository extends Repository<Log> implements LogRepositoryContract {
  constructor() {
    super(Log)
  }

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
    const start = startDate.isValid ? startDate.toISO() : null
    const end = endDate.isValid ? endDate.toISO() : null

    if (!start || !end) {
      throw new Error('Invalid date range provided.')
    }

    return await Log.query().whereBetween('created_at', [start, end]).orderBy('created_at', 'desc')
  }

  public async countByAction(action: string): Promise<number> {
    const result = await Log.query().where('action', action).count('* as total').first()
    return result ? Number(result.$extras.total) : 0
  }
}
