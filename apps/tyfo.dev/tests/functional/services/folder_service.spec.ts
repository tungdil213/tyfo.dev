import FolderService from '#services/folder_service'
import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import { FolderFactory } from '#factories/folder_factory'
import FolderRepository from '#repositories/folder_repository'

test.group('FolderService (DB-based)', (group) => {
  let service: FolderService

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    const folderRepository = new FolderRepository()
    service = new FolderService(folderRepository)
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('create folder', async ({ assert }) => {
    const folder = await service.createFolder({ name: 'Documents' })
    assert.exists(folder.uuid)
    assert.equal(folder.name, 'Documents')
  })

  test('get folder by name', async ({ assert }) => {
    const folder = await FolderFactory.create()
    const foundFolder = await service.getFolderByName(folder.name)
    assert.exists(foundFolder)
    assert.equal(foundFolder?.name, folder.name)
  })
})
