import StorageProvider from '#providers/storage_provider'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { ReportServiceContract } from '#services/contracts/report_service_contract'

@inject()
export default class ReportService implements ReportServiceContract {
  constructor(
    protected ctx: HttpContext,
    protected storage: StorageProvider
  ) {}
}
