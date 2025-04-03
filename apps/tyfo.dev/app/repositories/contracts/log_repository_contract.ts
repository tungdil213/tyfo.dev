import Log from '#models/log'

export abstract class LogRepositoryContract {
  abstract create(data: Partial<Log>): Promise<Log>
  abstract findByAction(action: string): Promise<Log | null>
  abstract list(): Promise<Log[]>
}
