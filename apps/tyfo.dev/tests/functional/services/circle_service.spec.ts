import CircleService from '#services/circle_service'
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import { CircleFactory } from '#factories/circle_factory'
import CircleRepository from '#repositories/circle_repository'

test.group('CircleService (DB-based)', (group) => {
  let service: CircleService

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    const circleRepository = new CircleRepository()
    service = new CircleService(circleRepository)
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('create circle', async ({ assert }) => {
    const circle = await service.createCircle({ name: 'Team Alpha' })
    assert.exists(circle.uuid)
    assert.equal(circle.name, 'Team Alpha')
  })

  test('get circle by name', async ({ assert }) => {
    const circle = await CircleFactory.create()
    const foundCircle = await service.getCircleByName(circle.name)
    assert.exists(foundCircle)
    assert.equal(foundCircle?.name, circle.name)
  })
})
