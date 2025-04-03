import Log from '#models/log'
import { LogRepositoryContract } from '#repositories/contracts/log_repository_contract'

export default class LogRepository implements LogRepositoryContract {
  public async create(data: Partial<Log>): Promise<Log> {
    return await Log.create(data)
  }

  public async findByAction(action: string): Promise<Log | null> {
    return await Log.findBy('action', action)
  }

  public async list(): Promise<Log[]> {
    return await Log.all()
  }
}
