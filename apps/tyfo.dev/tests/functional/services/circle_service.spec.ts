import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import CircleService from '#services/circle_service'
import CircleRepository from '#repositories/circle_repository'
import UserRepository from '#repositories/user_repository'
import RoleRepository from '#repositories/role_repository'
import AttributionRepository from '#repositories/attribution_repository'
import Circle from '#models/circle'
import User from '#models/user'
import Role from '#models/role'
import { DateTime } from 'luxon'

// Test du service de gestion des cercles
test.group('CircleService', (group) => {
  let service: CircleService
  let circleRepository: CircleRepository
  let userRepository: UserRepository
  let roleRepository: RoleRepository
  let attributionRepository: AttributionRepository

  // Setup pour le groupe de tests
  group.setup(async () => {
    // Initialiser les repositories
    circleRepository = new CircleRepository()
    userRepository = new UserRepository()
    roleRepository = new RoleRepository()
    attributionRepository = new AttributionRepository()

    // Créer le service à tester
    service = new CircleService(circleRepository, attributionRepository)
  })

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('createCircle should create a new circle', async ({ assert }) => {
    // Créer un utilisateur propriétaire du cercle
    const user = await userRepository.create({
      email: 'owner@example.com',
      fullName: 'Circle Owner',
      password: 'password123',
    })

    // Données du cercle
    const circleData = {
      name: 'Test Circle',
      description: 'A test circle for testing',
      userId: user.id,
    }

    // Créer le cercle
    const circle = await service.createCircle(circleData)

    // Vérifier les propriétés du cercle créé
    assert.equal(circle.name, circleData.name)
    assert.equal(circle.description, circleData.description)
    assert.equal(circle.userId, user.id)
    assert.isNotNull(circle.uuid)
    assert.isFalse(!!circle.archivedAt, 'Circle should not be archived initially')
  })

  test('getCircleByName should return a circle by name', async ({ assert }) => {
    // Créer un utilisateur propriétaire du cercle
    const user = await userRepository.create({
      email: 'owner@example.com',
      fullName: 'Circle Owner',
      password: 'password123',
    })

    // Créer un cercle
    const circleName = 'Test Circle'
    await service.createCircle({
      name: circleName,
      description: 'A test circle for testing',
      userId: user.id,
    })

    // Rechercher le cercle par nom
    const circle = await service.getCircleByName(circleName)

    // Vérifier que le cercle a été trouvé
    assert.isNotNull(circle)
    assert.equal(circle!.name, circleName)
  })

  test('archiveCircle should archive a circle by UUID', async ({ assert }) => {
    // Créer un utilisateur propriétaire du cercle
    const user = await userRepository.create({
      email: 'owner@example.com',
      fullName: 'Circle Owner',
      password: 'password123',
    })

    // Créer un cercle
    const circle = await service.createCircle({
      name: 'Circle to Archive',
      description: 'This circle will be archived',
      userId: user.id,
    })

    // Vérifier que le cercle n'est pas archivé initialement
    assert.isFalse(!!circle.archivedAt, 'Circle should not be archived initially')

    // Archiver le cercle
    const archivedCircle = await service.archiveCircle(circle.uuid)

    // Vérifier que le cercle est maintenant archivé
    assert.isNotNull(archivedCircle.archivedAt)
    // Check that archivedAt is a valid date
    assert.isTrue(
      archivedCircle.archivedAt instanceof DateTime || archivedCircle.archivedAt?.isValid
    )

    // Vérifier que le cercle archivé n'apparaît pas dans la liste des cercles actifs
    const activeCircles = await service.listCircles()
    assert.notInclude(
      activeCircles.map((c) => c.uuid),
      circle.uuid
    )

    // Vérifier qu'on peut toujours récupérer le cercle archivé par son UUID
    const retrievedArchivedCircle = await circleRepository.findByUuid(circle.uuid)
    assert.isNotNull(retrievedArchivedCircle)
    assert.isNotNull(retrievedArchivedCircle!.archivedAt)
  })

  test('addUserToCircle should add a user to a circle', async ({ assert }) => {
    // Créer un utilisateur propriétaire du cercle
    const owner = await userRepository.create({
      email: 'owner@example.com',
      fullName: 'Circle Owner',
      password: 'password123',
    })

    // Créer un utilisateur à ajouter au cercle
    const user = await userRepository.create({
      email: 'user@example.com',
      fullName: 'Circle User',
      password: 'password123',
    })

    // Créer un rôle pour l'utilisateur dans le cercle
    const role = await roleRepository.create({
      name: 'Member',
      description: 'Circle member role',
    })

    // Créer un cercle
    const circle = await service.createCircle({
      name: 'Test Circle',
      description: 'A test circle for testing',
      userId: owner.id,
    })

    // Ajouter l'utilisateur au cercle avec le rôle
    await service.addUserToCircle(circle.uuid, user.uuid, role.uuid)

    // Vérifier que l'utilisateur a été ajouté au cercle avec le rôle
    const usersInCircle = await service.listCirclesByUser(user.uuid)
    assert.lengthOf(usersInCircle, 1)
    assert.equal(usersInCircle[0].uuid, circle.uuid)

    // Vérifier que le rôle a bien été attribué
    const circlesByUserAndRole = await service.listCirclesByUserAndRole(user.uuid, role.uuid)
    assert.lengthOf(circlesByUserAndRole, 1)
    assert.equal(circlesByUserAndRole[0].uuid, circle.uuid)
  })

  test('removeUserFromCircle should remove a user from a circle', async ({ assert }) => {
    // Créer un utilisateur propriétaire du cercle
    const owner = await userRepository.create({
      email: 'owner@example.com',
      fullName: 'Circle Owner',
      password: 'password123',
    })

    // Créer un utilisateur à ajouter puis retirer du cercle
    const user = await userRepository.create({
      email: 'user@example.com',
      fullName: 'Circle User',
      password: 'password123',
    })

    // Créer un rôle pour l'utilisateur dans le cercle
    const role = await roleRepository.create({
      name: 'Member',
      description: 'Circle member role',
    })

    // Créer un cercle
    const circle = await service.createCircle({
      name: 'Test Circle',
      description: 'A test circle for testing',
      userId: owner.id,
    })

    // Ajouter l'utilisateur au cercle avec le rôle
    await service.addUserToCircle(circle.uuid, user.uuid, role.uuid)

    // Vérifier que l'utilisateur a été ajouté
    let usersInCircle = await service.listCirclesByUser(user.uuid)
    assert.lengthOf(usersInCircle, 1)

    // Retirer l'utilisateur du cercle
    await service.removeUserFromCircle(circle.uuid, user.uuid)

    // Vérifier que l'utilisateur a été retiré
    usersInCircle = await service.listCirclesByUser(user.uuid)
    assert.lengthOf(usersInCircle, 0)
  })

  test('listCircles should only return active (non-archived) circles', async ({ assert }) => {
    // Créer un utilisateur propriétaire des cercles
    const user = await userRepository.create({
      email: 'owner@example.com',
      fullName: 'Circle Owner',
      password: 'password123',
    })

    // Créer un cercle actif
    const activeCircle = await service.createCircle({
      name: 'Active Circle',
      description: 'An active circle',
      userId: user.id,
    })

    // Créer un cercle à archiver
    const circleToArchive = await service.createCircle({
      name: 'Circle to Archive',
      description: 'This circle will be archived',
      userId: user.id,
    })

    // Archiver le deuxième cercle
    await service.archiveCircle(circleToArchive.uuid)

    // Lister les cercles actifs
    const activeCircles = await service.listCircles()

    // Vérifier que seul le cercle actif est retourné
    assert.lengthOf(activeCircles, 1)
    assert.equal(activeCircles[0].uuid, activeCircle.uuid)
    assert.notEqual(activeCircles[0].uuid, circleToArchive.uuid)
  })
})
