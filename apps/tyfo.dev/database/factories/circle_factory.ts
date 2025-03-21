import Circle from '#models/circle'
import Factory from '@adonisjs/lucid/factories'
import { randomUUID } from 'node:crypto'

import { UserFactory } from '#factories/user_factory'

export const CircleFactory = Factory.define(Circle, async ({ faker }) => {
  return {
    uuid: randomUUID(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
  }
})
  .relation('owner', () => UserFactory)
  .build()
