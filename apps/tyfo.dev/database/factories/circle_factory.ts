import Circle from '#models/circle'
import Factory from '@adonisjs/lucid/factories'
import { UserFactory } from '#factories/user_factory'
import { generateUuid } from '#utils/uuid_helper'

export const CircleFactory = Factory.define(Circle, async ({ faker }) => {
  return {
    uuid: generateUuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    archivedAt: null,
  }
})
  .relation('owner', () => UserFactory)
  .build()
