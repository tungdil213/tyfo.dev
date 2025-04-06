import Log from '#models/log'

export interface LogServiceContract {
  createLog(data: Partial<Log>): Promise<Log>
  listLogs(filters?: Record<string, any>): Promise<Log[]>
}

export interface CreateLogParams {
  userId: number
  action: string
  primaryType: string
  primaryObject: string
  secondaryType?: string | null
  secondaryObject?: string | null
  message: string
}
