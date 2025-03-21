import ObjectModel from '#models/object'
import Factory from '@adonisjs/lucid/factories'
import { randomUUID } from 'node:crypto'
import { FolderFactory } from '#factories/folder_factory'
import { UserFactory } from '#factories/user_factory'

export const ObjectModelFactory = Factory.define(ObjectModel, async ({ faker }) => {
  return {
    uuid: randomUUID(),
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
