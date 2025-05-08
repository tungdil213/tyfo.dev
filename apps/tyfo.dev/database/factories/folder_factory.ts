import Factory from '@adonisjs/lucid/factories'
import { ObjectModelFactory } from '#factories/object_model_factory'
import Folder from '#models/folder'
import { generateUuid } from '#utils/uuid_helper'

export const FolderFactory = Factory.define(Folder, ({ faker }) => {
  return {
    uuid: generateUuid(),
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
    circleId: undefined,
    userId: undefined,
    parentId: null,
  }
})
  .state('root', () => ({
    parentId: null,
  }))
  .state('child', () => ({}))
  .relation('objects', () => ObjectModelFactory)
  .build()
