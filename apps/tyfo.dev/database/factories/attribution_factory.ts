import Factory from '@adonisjs/lucid/factories'
import hash from '@adonisjs/core/services/hash'
import { randomUUID } from 'node:crypto'

import Attribution from '#models/attribution'
import { UserFactory } from '#factories/user_factory'
import { CircleFactory } from '#factories/circle_factory'
import { RoleFactory } from '#factories/role_factory'

export const AttributionFactory = Factory.define(Attribution, async ({ faker }) => {
  return {
    uuid: randomUUID(),
  }
})
  .relation('user', () => UserFactory)
  .relation('role', () => RoleFactory)
  .relation('circle', () => CircleFactory)
  .build()
