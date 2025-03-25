import Factory from '@adonisjs/lucid/factories'
import Attribution from '#models/attribution'
import { UserFactory } from '#factories/user_factory'
import { RoleFactory } from '#factories/role_factory'
import { CircleFactory } from '#factories/circle_factory'
import { randomUUID } from 'node:crypto'

export const AttributionFactory = Factory.define(Attribution, async () => ({
  uuid: randomUUID(),
}))
  .relation('user', () => UserFactory)
  .relation('role', () => RoleFactory)
  .relation('circle', () => CircleFactory)
  .build()
