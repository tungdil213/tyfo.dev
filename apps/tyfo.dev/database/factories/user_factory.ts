import Factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { RoleFactory } from './role_factory.js'
import { generateUuid } from '#utils/uuid_helper'

const passwordHash = await hash.make('password123')

export const UserFactory = Factory.define(User, async ({ faker }) => ({
  uuid: generateUuid(),
  fullName: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password: passwordHash,
  deletedAt: null,
}))
  .relation('roles', () => RoleFactory)
  .build()
