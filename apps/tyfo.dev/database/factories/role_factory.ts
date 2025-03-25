import Factory from '@adonisjs/lucid/factories'
import Role from '#models/role'
import { randomUUID } from 'node:crypto'

export const RoleFactory = Factory.define(Role, async ({ faker }) => ({
  uuid: randomUUID(),
  name: faker.helpers.arrayElement(['Admin', 'Prestataire', 'Consommateur']),
  description: faker.lorem.sentence(),
})).build()
