import Factory from '@adonisjs/lucid/factories'
import Log from '#models/log'
import { UserFactory } from '#factories/user_factory'
import { generateUuid } from '#utils/uuid_helper'

export const LogFactory = Factory.define(Log, async ({ faker }) => {
  return {
    uuid: generateUuid(),
    action: faker.helpers.arrayElement(['UPLOAD_FILE', 'DOWNLOAD_FILE', 'DELETE_FILE']),
    primaryType: 'Object',
    primaryObject: faker.string.uuid(),
    secondaryType: 'User',
    secondaryObject: faker.string.uuid(),
    message: faker.lorem.sentence(),
  }
})
  .relation('user', () => UserFactory) // L'action est liée à un utilisateur

  .build()
