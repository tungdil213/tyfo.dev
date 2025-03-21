import Circle from '#models/circle'
import Factory from '@adonisjs/lucid/factories'

export const CircleFactory = Factory.define(Circle, async ({ faker }) => {
  return {
    name: faker.company.name(),
    description: faker.lorem.sentence(),
  }
}).build()
