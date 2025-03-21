import Role from '#models/role'
import Factory from '@adonisjs/lucid/factories'
import { randomUUID } from 'node:crypto'

export const RoleFactory = Factory.define(Role, async ({ faker }) => {
  return {
    uuid: randomUUID(),
    name: faker.helpers.arrayElement(['Admin', 'Membre', 'Observateur']),
    description: faker.lorem.sentence(),
  }
}).build()
