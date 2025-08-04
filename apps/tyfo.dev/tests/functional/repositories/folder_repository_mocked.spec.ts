import { test } from '@japa/runner'
import { generateUuid } from '#utils/uuid_helper'
import Folder from '#models/folder'
import type { FolderRepositoryContract } from '#repositories/contracts/folder_repository_contract'

// Class to simulate a folder without depending on the database
interface MockFolderData {
  uuid: string
  name: string
  description: string
  circleId: number
  userId: number
  parentId?: number | null
  createdAt?: Date
  updatedAt?: Date
}

class MockFolder implements Partial<Folder> {
  public id: number
  public uuid: string
  public name: string
  public description: string
  public circleId: number
  public userId: number
  public parentId?: number | null
  public createdAt: Date
  public updatedAt: Date

  constructor(data: MockFolderData, id: number = Math.floor(Math.random() * 1000)) {
    this.id = id
    this.uuid = data.uuid
    this.name = data.name
    this.description = data.description
    this.circleId = data.circleId
    this.userId = data.userId
    this.parentId = data.parentId || null
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }
}

// Mocked implementation of folder repository
class MockFolderRepository implements FolderRepositoryContract {
  private folders: MockFolder[] = []
  private nextId: number = 1

  async create(data: any): Promise<MockFolder> {
    const folder = new MockFolder(data, this.nextId++)
    this.folders.push(folder)
    return folder
  }

  async findByUuid(uuid: string): Promise<MockFolder | null> {
    const folder = this.folders.find((f) => f.uuid === uuid)
    return folder || null
  }

  async findByName(name: string): Promise<MockFolder | null> {
    const folder = this.folders.find((f) => f.name === name)
    return folder || null
  }

  async list(): Promise<MockFolder[]> {
    return [...this.folders]
  }

  async listByCircle(circleId: number): Promise<MockFolder[]> {
    return this.folders.filter((f) => f.circleId === circleId)
  }

  async findByParent(parentId: number): Promise<MockFolder[]> {
    return this.folders.filter((f) => f.parentId === parentId)
  }

  async findByCircle(circleId: number): Promise<MockFolder[]> {
    return this.folders.filter((f) => f.circleId === circleId)
  }

  async getPath(folderId: number): Promise<MockFolder[]> {
    // Simplified implementation for testing
    const folder = this.folders.find((f) => f.id === folderId)
    if (!folder) return []

    const path: MockFolder[] = [folder]
    let currentFolder = folder

    // Go up the folder hierarchy until we reach a folder with no parent
    while (currentFolder.parentId) {
      const parentFolder = this.folders.find((f) => f.id === currentFolder.parentId)
      if (!parentFolder) break
      path.unshift(parentFolder) // Add parent to the beginning of the path
      currentFolder = parentFolder
    }

    return path
  }

  // Additional methods from FolderRepository
  async listByCircleUuid(circleUuid: string): Promise<MockFolder[]> {
    return this.folders.filter((f) => f.circleId.toString() === circleUuid)
  }

  async listByRole(roleUuid: string): Promise<MockFolder[]> {
    // In our mock, we don't implement role filtering
    return []
  }

  async listByUser(userId: number): Promise<MockFolder[]> {
    return this.folders.filter((f) => f.userId === userId)
  }

  async listByCircleAndRole(circleUuid: string, roleUuid: string): Promise<MockFolder[]> {
    // In our mock, we don't implement role filtering
    return this.folders.filter((f) => f.circleId.toString() === circleUuid)
  }

  async listByRoleAndUser(roleUuid: string, userId: number): Promise<MockFolder[]> {
    // In our mock, we don't implement role filtering
    return this.folders.filter((f) => f.userId === userId)
  }

  async listByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<MockFolder[]> {
    return this.folders.filter((f) => f.circleId.toString() === circleUuid && f.userId === userId)
  }

  async listByCircleAndRoleAndUserAndObject(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string
  ): Promise<MockFolder[]> {
    // In our mock, we don't implement object filtering
    return this.folders.filter((f) => f.circleId.toString() === circleUuid && f.userId === userId)
  }

  async listByCircleAndRoleAndUserAndObjectAndFolder(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string,
    folderUuid: string
  ): Promise<MockFolder[]> {
    // In our mock, we don't implement object and folder filtering
    return this.folders.filter((f) => f.circleId.toString() === circleUuid && f.userId === userId)
  }

  async listByCircleAndUser(circleUuid: string, userId: number): Promise<MockFolder[]> {
    return this.folders.filter((f) => f.circleId.toString() === circleUuid && f.userId === userId)
  }
}

test.group('FolderRepository Mocked Tests', (group) => {
  let folderRepository: MockFolderRepository

  // Create a new instance of the mocked repository before each test
  group.each.setup(() => {
    folderRepository = new MockFolderRepository()
  })

  test('create should insert a new folder and return it', async ({ assert }) => {
    const uuid = generateUuid()
    const folderData = {
      uuid,
      name: 'Test Folder',
      description: 'Test description',
      circleId: 1,
      userId: 1,
    }

    const folder = await folderRepository.create(folderData)

    assert.exists(folder)
    assert.equal(folder.uuid, uuid)
    assert.equal(folder.name, folderData.name)
    assert.equal(folder.description, folderData.description)
    assert.equal(folder.circleId, folderData.circleId)
    assert.equal(folder.userId, folderData.userId)
  })

  test('findByUuid should retrieve a folder by its UUID', async ({ assert }) => {
    // Create a folder
    const uuid = generateUuid()
    const folderData = {
      uuid,
      name: 'Find by UUID Folder',
      description: 'Test find by UUID',
      circleId: 1,
      userId: 1,
    }

    await folderRepository.create(folderData)

    // Test findByUuid with a valid UUID
    const folder = await folderRepository.findByUuid(uuid)

    // Verify the folder is found
    assert.exists(folder)
    assert.equal(folder!.uuid, uuid)
    assert.equal(folder!.name, folderData.name)

    // Test with a non-existent UUID
    const nonExistentFolder = await folderRepository.findByUuid('non-existent-uuid')
    assert.isNull(nonExistentFolder)
  })

  test('findByName should retrieve a folder by its name', async ({ assert }) => {
    // Create a folder
    const folderName = 'Unique Folder Name'
    const folderData = {
      uuid: generateUuid(),
      name: folderName,
      description: 'Test find by name',
      circleId: 1,
      userId: 1,
    }

    await folderRepository.create(folderData)

    // Test findByName with a valid name
    const folder = await folderRepository.findByName(folderName)

    // Verify the folder is found
    assert.exists(folder)
    assert.equal(folder!.name, folderName)

    // Test with a non-existent name
    const nonExistentFolder = await folderRepository.findByName('Non-existent Folder')
    assert.isNull(nonExistentFolder)
  })

  test('list should retrieve all folders', async ({ assert }) => {
    // Create multiple folders
    const folderData1 = {
      uuid: generateUuid(),
      name: 'Folder 1',
      description: 'First test folder',
      circleId: 1,
      userId: 1,
    }

    const folderData2 = {
      uuid: generateUuid(),
      name: 'Folder 2',
      description: 'Second test folder',
      circleId: 2,
      userId: 2,
    }

    await folderRepository.create(folderData1)
    await folderRepository.create(folderData2)

    // List all folders
    const folders = await folderRepository.list()

    // Verify we get all folders
    assert.lengthOf(folders, 2)
    assert.isTrue(folders.some((f) => f.name === folderData1.name))
    assert.isTrue(folders.some((f) => f.name === folderData2.name))
  })

  test('listByCircle should retrieve folders for a specific circle', async ({ assert }) => {
    // Create folders for different circles
    const circle1Id = 1
    const circle2Id = 2

    const foldersForCircle1 = [
      {
        uuid: generateUuid(),
        name: 'Circle 1 Folder 1',
        description: 'Circle 1 test folder 1',
        circleId: circle1Id,
        userId: 1,
      },
      {
        uuid: generateUuid(),
        name: 'Circle 1 Folder 2',
        description: 'Circle 1 test folder 2',
        circleId: circle1Id,
        userId: 2,
      },
    ]

    const folderForCircle2 = {
      uuid: generateUuid(),
      name: 'Circle 2 Folder',
      description: 'Circle 2 test folder',
      circleId: circle2Id,
      userId: 1,
    }

    await Promise.all([
      folderRepository.create(foldersForCircle1[0]),
      folderRepository.create(foldersForCircle1[1]),
      folderRepository.create(folderForCircle2),
    ])

    // List folders for circle 1
    const circle1Folders = await folderRepository.findByCircle(circle1Id)

    // Verify we only get folders for circle 1
    assert.lengthOf(circle1Folders, 2)
    circle1Folders.forEach((folder) => {
      assert.equal(folder.circleId, circle1Id)
    })

    // List folders for circle 2
    const circle2Folders = await folderRepository.findByCircle(circle2Id)

    // Verify we only get folders for circle 2
    assert.lengthOf(circle2Folders, 1)
    assert.equal(circle2Folders[0].circleId, circle2Id)
  })

  test('listByCircleAndUser should retrieve folders for a specific circle and user', async ({
    assert,
  }) => {
    const circle3Id = 3
    const user4Id = 4
    const user5Id = 5

    // Create folders for user 4 in circle 3
    const foldersForUser4 = [
      {
        uuid: generateUuid(),
        name: 'User 4 First Folder',
        description: 'User 4 test folder 1',
        circleId: circle3Id,
        userId: user4Id,
      },
      {
        uuid: generateUuid(),
        name: 'User 4 Second Folder',
        description: 'User 4 test folder 2',
        circleId: circle3Id,
        userId: user4Id,
      },
    ]

    // Create a folder for user 5 in the same circle
    const folderForUser5 = {
      uuid: generateUuid(),
      name: 'User 5 Folder',
      description: 'User 5 test folder',
      circleId: circle3Id,
      userId: user5Id,
    }

    await Promise.all([
      folderRepository.create(foldersForUser4[0]),
      folderRepository.create(foldersForUser4[1]),
      folderRepository.create(folderForUser5),
    ])

    // Get folders for user 4 in circle 3
    const folders = await folderRepository.listByCircleAndUser(circle3Id.toString(), user4Id)

    // Verify we only get folders for user 4
    assert.lengthOf(folders, 2)
    folders.forEach((folder) => {
      assert.equal(folder.userId, user4Id)
      assert.equal(folder.circleId, circle3Id)
    })
  })

  test('listByUser should retrieve folders for a specific user', async ({ assert }) => {
    // Create folders for different users
    const userId = 6
    const differentUserId = 7

    const folderForUser = {
      uuid: generateUuid(),
      name: 'User Folder',
      description: 'User test folder',
      circleId: 1,
      userId: userId,
    }

    const folderForDifferentUser = {
      uuid: generateUuid(),
      name: 'Different User Folder',
      description: 'Different user test folder',
      circleId: 1,
      userId: differentUserId,
    }

    await folderRepository.create(folderForUser)
    await folderRepository.create(folderForDifferentUser)

    // List folders for the specific user
    const userFolders = await folderRepository.listByUser(userId)

    assert.lengthOf(userFolders, 1)
    assert.equal(userFolders[0].uuid, folderForUser.uuid)
    assert.equal(userFolders[0].userId, userId)
  })

  test('findByParent should retrieve child folders', async ({ assert }) => {
    // Create a parent folder
    const parentFolderData = {
      uuid: generateUuid(),
      name: 'Parent Folder',
      description: 'Parent folder description',
      circleId: 1,
      userId: 1,
    }
    const parentFolder = await folderRepository.create(parentFolderData)

    // Create child folders
    const childFolder1Data = {
      uuid: generateUuid(),
      name: 'Child Folder 1',
      description: 'Child folder 1 description',
      circleId: 1,
      userId: 1,
      parentId: parentFolder.id,
    }

    const childFolder2Data = {
      uuid: generateUuid(),
      name: 'Child Folder 2',
      description: 'Child folder 2 description',
      circleId: 1,
      userId: 1,
      parentId: parentFolder.id,
    }

    await folderRepository.create(childFolder1Data)
    await folderRepository.create(childFolder2Data)

    // Find children of the parent folder
    const childFolders = await folderRepository.findByParent(parentFolder.id)

    // Verify we get both child folders
    assert.lengthOf(childFolders, 2)
    childFolders.forEach((folder) => {
      assert.equal(folder.parentId, parentFolder.id)
    })
  })

  test('getPath should retrieve the folder hierarchy path', async ({ assert }) => {
    // Create a hierarchy of folders: grandparent -> parent -> child
    const grandparentData = {
      uuid: generateUuid(),
      name: 'Grandparent Folder',
      description: 'Top level folder',
      circleId: 1,
      userId: 1,
    }
    const grandparent = await folderRepository.create(grandparentData)

    const parentData = {
      uuid: generateUuid(),
      name: 'Parent Folder',
      description: 'Mid level folder',
      circleId: 1,
      userId: 1,
      parentId: grandparent.id,
    }
    const parent = await folderRepository.create(parentData)

    const childData = {
      uuid: generateUuid(),
      name: 'Child Folder',
      description: 'Bottom level folder',
      circleId: 1,
      userId: 1,
      parentId: parent.id,
    }
    const child = await folderRepository.create(childData)

    // Get the path from child to grandparent
    const path = await folderRepository.getPath(child.id)

    // Verify the path is correct
    assert.lengthOf(path, 3)
    assert.equal(path[0].id, grandparent.id)
    assert.equal(path[1].id, parent.id)
    assert.equal(path[2].id, child.id)
  })
})
