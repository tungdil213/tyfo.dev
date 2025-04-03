import Log from '#models/log'

export interface LogServiceContract {
  createLog(data: Partial<Log>): Promise<Log>
  listLogs(filters?: Record<string, any>): Promise<Log[]>
}
