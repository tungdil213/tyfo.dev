import LogService from '#services/log_service'
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import { LogFactory } from '#factories/log_factory'
import LogRepository from '#repositories/log_repository'

test.group('LogService (DB-based)', (group) => {
  let service: LogService

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    const logRepository = new LogRepository()
    service = new LogService(logRepository)
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('create log', async ({ assert }) => {
    const log = await service.createLog({ action: 'UPLOAD_FILE', message: 'File uploaded' })
    assert.exists(log.uuid)
    assert.equal(log.action, 'UPLOAD_FILE')
  })

  test('get log by action', async ({ assert }) => {
    const log = await LogFactory.create()
    const foundLog = await service.getLogByAction(log.action)
    assert.exists(foundLog)
    assert.equal(foundLog?.action, log.action)
  })
})
