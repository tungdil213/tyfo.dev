import Factory from '@adonisjs/lucid/factories'
import { ObjectModelFactory } from '#factories/object_model_factory'
import Folder from '#models/folder'
import { randomUUID } from 'node:crypto'

export const FolderFactory = Factory.define(Folder, ({ faker }) => {
  return {
    uuid: randomUUID(),
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
