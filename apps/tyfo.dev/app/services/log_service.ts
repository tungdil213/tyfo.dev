import { inject } from '@adonisjs/core'
import Log from '#models/log'
import { LogRepositoryContract } from '#repositories/contracts/log_repository_contract'
import { LogServiceContract } from '#services/contracts/log_service_contract'

@inject()
export default class LogService implements LogServiceContract {
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
