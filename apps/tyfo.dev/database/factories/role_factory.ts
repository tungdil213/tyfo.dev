import Factory from '@adonisjs/lucid/factories'
import Role from '#models/role'
import { generateUuid } from '#utils/uuid_helper'

export const RoleFactory = Factory.define(Role, async ({ faker }) => ({
  uuid: generateUuid(),
  name: faker.helpers.arrayElement(['Admin', 'Prestataire', 'Consommateur']),
  description: faker.lorem.sentence(),
})).build()
