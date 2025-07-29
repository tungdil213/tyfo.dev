import { test } from '@japa/runner'
import LogService from '#services/log_service'
import { CreateLogParams } from '#services/contracts/log_service_contract'
import { generateUuid } from '#utils/uuid_helper'
import User from '#models/user'

// Mock du modèle User pour les tests
class MockUser implements Partial<User> {
  constructor(
    public id: number,
    public uuid: string,
    public email: string,
    public fullName?: string
  ) {}
}

// Mock du repository de logs pour les tests
class TestLogRepository {
  private logs: Array<{
    uuid: string
    userId: number
    action: string
    primaryType: string
    primaryObject: string
    secondaryType: string | null
    secondaryObject: string | null
    message: string
    createdAt?: Date
  }> = []

  async create(data: {
    uuid: string
    userId: number
    action: string
    primaryType: string
    primaryObject: string
    secondaryType: string | null
    secondaryObject: string | null
    message: string
  }) {
    const log = {
      ...data,
      createdAt: new Date(),
    }
    this.logs.push(log)
    return log
  }

  async findByUser(userId: number) {
    return this.logs.filter((log) => log.userId === userId)
  }

  async findByPrimaryObject(objectType: string, objectId: string) {
    return this.logs.filter(
      (log) => log.primaryType === objectType && log.primaryObject === objectId
    )
  }

  // Méthode auxiliaire pour les tests
  getAllLogs() {
    return this.logs
  }
}

test.group('LogService', (group) => {
  let service: LogService
  let logRepository: TestLogRepository

  group.each.setup(() => {
    logRepository = new TestLogRepository()
    service = new LogService(logRepository as any)
  })

  test('createLog should create a new log entry with correct parameters', async ({ assert }) => {
    const params: CreateLogParams = {
      userId: 1,
      action: 'TEST_ACTION',
      primaryType: 'TEST_TYPE',
      primaryObject: 'test-uuid',
      message: 'Test log message',
    }

    const result = await service.createLog(params)

    assert.exists(result)
    assert.equal(result.userId, params.userId)
    assert.equal(result.action, params.action)
    assert.equal(result.primaryType, params.primaryType)
    assert.equal(result.primaryObject, params.primaryObject)
    assert.equal(result.message, params.message)
    assert.isNull(result.secondaryType)
    assert.isNull(result.secondaryObject)
  })

  test('logAction should create a log with simplified parameters', async ({ assert }) => {
    const user = new MockUser(1, generateUuid(), 'user@example.com', 'Test User')
    const action = 'VIEW'
    const objectType = 'DOCUMENT'
    const objectId = generateUuid()
    const message = 'User viewed document'

    await service.logAction(user as User, action, objectType, objectId, message)

    const logs = logRepository.getAllLogs()
    assert.lengthOf(logs, 1)

    const log = logs[0]
    assert.equal(log.userId, user.id)
    assert.equal(log.action, action)
    assert.equal(log.primaryType, objectType)
    assert.equal(log.primaryObject, objectId)
    assert.equal(log.message, message)
    assert.isNull(log.secondaryType)
    assert.isNull(log.secondaryObject)
  })

  test('logRelationalAction should create a log with two related objects', async ({ assert }) => {
    const user = new MockUser(2, generateUuid(), 'user2@example.com')
    const action = 'MOVE'
    const sourceType = 'FOLDER'
    const sourceId = generateUuid()
    const targetType = 'FOLDER'
    const targetId = generateUuid()
    const message = 'User moved folder'

    await service.logRelationalAction(
      user as User,
      action,
      sourceType,
      sourceId,
      targetType,
      targetId,
      message
    )

    const logs = logRepository.getAllLogs()
    assert.lengthOf(logs, 1)

    const log = logs[0]
    assert.equal(log.userId, user.id)
    assert.equal(log.action, action)
    assert.equal(log.primaryType, sourceType)
    assert.equal(log.primaryObject, sourceId)
    assert.equal(log.secondaryType, targetType)
    assert.equal(log.secondaryObject, targetId)
    assert.equal(log.message, message)
  })

  test('getUserLogs should return logs for a specific user', async ({ assert }) => {
    const user1 = new MockUser(3, generateUuid(), 'user3@example.com')
    const user2 = new MockUser(4, generateUuid(), 'user4@example.com')

    // Créer des logs pour différents utilisateurs
    await service.logAction(user1 as User, 'ACTION1', 'TYPE1', generateUuid(), 'Message 1')
    await service.logAction(user1 as User, 'ACTION2', 'TYPE2', generateUuid(), 'Message 2')
    await service.logAction(user2 as User, 'ACTION3', 'TYPE3', generateUuid(), 'Message 3')

    // Vérifier qu'on récupère uniquement les logs de user1
    const user1Logs = await service.getUserLogs(user1.id)
    assert.lengthOf(user1Logs, 2)
    assert.isTrue(user1Logs.every((log) => log.userId === user1.id))

    // Vérifier qu'on récupère uniquement les logs de user2
    const user2Logs = await service.getUserLogs(user2.id)
    assert.lengthOf(user2Logs, 1)
    assert.equal(user2Logs[0].userId, user2.id)
  })

  test('getObjectLogs should return logs for a specific object', async ({ assert }) => {
    const user = new MockUser(5, generateUuid(), 'user5@example.com')
    const objectType = 'DOCUMENT'
    const objectId = generateUuid()

    // Créer des logs pour différents objets
    await service.logAction(user as User, 'CREATE', objectType, objectId, 'Create message')
    await service.logAction(user as User, 'UPDATE', objectType, objectId, 'Update message')
    await service.logAction(user as User, 'VIEW', 'FOLDER', generateUuid(), 'View folder')

    // Vérifier qu'on récupère uniquement les logs pour l'objet spécifique
    const objectLogs = await service.getObjectLogs(objectType, objectId)
    assert.lengthOf(objectLogs, 2)
    assert.isTrue(objectLogs.every((log) => log.primaryType === objectType && log.primaryObject === objectId))
  })

  test('logUserLogin should create a login log entry', async ({ assert }) => {
    const user = new MockUser(6, generateUuid(), 'user6@example.com', 'Jane Doe')
    
    await service.logUserLogin(user as User)
    
    const logs = logRepository.getAllLogs()
    assert.lengthOf(logs, 1)
    assert.equal(logs[0].action, 'USER_LOGIN')
    assert.equal(logs[0].primaryType, 'USER')
    assert.equal(logs[0].primaryObject, user.uuid)
    assert.include(logs[0].message, "L'utilisateur Jane Doe s'est connecté")
  })

  test('logUserLogout should create a logout log entry', async ({ assert }) => {
    const user = new MockUser(7, generateUuid(), 'user7@example.com', 'John Smith')
    
    await service.logUserLogout(user as User)
    
    const logs = logRepository.getAllLogs()
    assert.lengthOf(logs, 1)
    assert.equal(logs[0].action, 'USER_LOGOUT')
    assert.equal(logs[0].primaryType, 'USER')
    assert.equal(logs[0].primaryObject, user.uuid)
    assert.include(logs[0].message, "L'utilisateur John Smith s'est déconnecté")
  })

  test('should use email when fullName is not available', async ({ assert }) => {
    const user = new MockUser(8, generateUuid(), 'no.name@example.com')
    
    await service.logUserLogin(user as User)
    
    const logs = logRepository.getAllLogs()
    assert.include(logs[0].message, "L'utilisateur no.name@example.com s'est connecté")
  })

  test('logObjectCreation should create a creation log entry', async ({ assert }) => {
    const user = new MockUser(9, generateUuid(), 'user9@example.com', 'Creator')
    const objectType = 'DOCUMENT'
    const objectId = generateUuid()
    const objectName = 'Important Document'
    
    await service.logObjectCreation(user as User, objectType, objectId, objectName)
    
    const logs = logRepository.getAllLogs()
    assert.lengthOf(logs, 1)
    assert.equal(logs[0].action, 'OBJECT_CREATE')
    assert.equal(logs[0].primaryType, objectType)
    assert.equal(logs[0].primaryObject, objectId)
    assert.include(logs[0].message, `L'utilisateur Creator a créé document "Important Document"`)
  })

  test('logObjectModification should create an update log entry', async ({ assert }) => {
    const user = new MockUser(10, generateUuid(), 'user10@example.com', 'Editor')
    const objectType = 'FOLDER'
    const objectId = generateUuid()
    const objectName = 'Project Folder'
    
    await service.logObjectModification(user as User, objectType, objectId, objectName)
    
    const logs = logRepository.getAllLogs()
    assert.lengthOf(logs, 1)
    assert.equal(logs[0].action, 'OBJECT_UPDATE')
    assert.equal(logs[0].primaryType, objectType)
    assert.equal(logs[0].primaryObject, objectId)
    assert.include(logs[0].message, `L'utilisateur Editor a modifié folder "Project Folder"`)
  })

  test('logObjectDeletion should create a deletion log entry', async ({ assert }) => {
    const user = new MockUser(11, generateUuid(), 'user11@example.com', 'Remover')
    const objectType = 'FILE'
    const objectId = generateUuid()
    const objectName = 'Old File'
    
    await service.logObjectDeletion(user as User, objectType, objectId, objectName)
    
    const logs = logRepository.getAllLogs()
    assert.lengthOf(logs, 1)
    assert.equal(logs[0].action, 'OBJECT_DELETE')
    assert.equal(logs[0].primaryType, objectType)
    assert.equal(logs[0].primaryObject, objectId)
    assert.include(logs[0].message, `L'utilisateur Remover a supprimé file "Old File"`)
  })
})
