import Factory from '@adonisjs/lucid/factories'
import { CircleFactory } from '#factories/circle_factory'
import { UserFactory } from '#factories/user_factory'
import { ObjectModelFactory } from '#factories/object_model_factory'
import Folder from '#models/folder'
import { randomUUID } from 'node:crypto'

export const FolderFactory = Factory.define(Folder, async ({ faker }) => {
  return {
    uuid: randomUUID(),
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  }
})
  .relation('objects', () => ObjectModelFactory)
  .relation('circle', () => CircleFactory)
  .relation('user', () => UserFactory)
  .build()
