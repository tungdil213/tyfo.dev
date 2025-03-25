import { inject } from '@adonisjs/core'
import Log from '#models/log'
import { LogRepositoryContract } from '#contracts/log_repository_contract'

@inject()
export default class LogService {
  constructor(private logRepository: LogRepositoryContract) {}

  public async createLog(data: Partial<Log>): Promise<Log> {
    return await this.logRepository.create(data)
  }

  public async getLogByAction(action: string): Promise<Log | null> {
    return await this.logRepository.findByAction(action)
  }

  public async listLogs(): Promise<Log[]> {
    return await this.logRepository.list()
  }
}
