import ObjectModel from '#models/object'
import Factory from '@adonisjs/lucid/factories'
import { FolderFactory } from '#factories/folder_factory'
import { UserFactory } from '#factories/user_factory'
import { generateUuid } from '#utils/uuid_helper'

export const ObjectModelFactory = Factory.define(ObjectModel, async ({ faker }) => {
  return {
    uuid: generateUuid(),
    name: faker.system.fileName(),
    mimeType: faker.system.mimeType(),
    hash: faker.string.uuid(),
    revision: faker.number.int({ min: 1, max: 5 }),
    location: `/uploads/${faker.system.fileName()}`,
  }
})
  .relation('folder', () => FolderFactory) // Relation avec un dossier
  .relation('owner', () => UserFactory)
  .build()
