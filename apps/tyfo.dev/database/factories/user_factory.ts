import User from '#models/user'
import Factory from '@adonisjs/lucid/factories'
import hash from '@adonisjs/core/services/hash'
import { randomUUID } from 'node:crypto'
import { AttributionFactory } from '#factories/attribution_factory'

export const UserFactory = Factory.define(User, async ({ faker }) => {
  return {
    uuid: randomUUID(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: await hash.make('password123'),
  }
})
  .relation('attributions', () => AttributionFactory)
  .build()
