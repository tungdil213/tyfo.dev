import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import Attribution from '#models/attribution'
import { UserFactory } from '#factories/user_factory'
import { RoleFactory } from '#factories/role_factory'
import { CircleFactory } from '#factories/circle_factory'
import AttributionRepository from '#repositories/attribution_repository'
import AttributionService from '#services/attribution_service'
import { UserRepositoryContract } from '#repositories/contracts/user_repository_contract'
import { CircleRepositoryContract } from '#repositories/contracts/circle_repository_contract'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import CircleRepository from '#repositories/circle_repository'
import RoleRepository from '#repositories/role_repository'
import UserRepository from '#repositories/user_repository'

test.group('AttributionService', (group) => {
  let service: AttributionService
  let attributionRepo: AttributionRepository
  let userRepository: UserRepositoryContract
  let roleRepository: RoleRepositoryContract
  let circleRepository: CircleRepositoryContract

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    attributionRepo = new AttributionRepository()
    userRepository = new UserRepository()
    roleRepository = new RoleRepository()
    circleRepository = new CircleRepository()

    service = new AttributionService(
      attributionRepo,
      userRepository,
      roleRepository,
      circleRepository
    )
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('assignRole doit créer une attribution', async ({ assert }) => {
    // Création des entités via les factories
    const user = await UserFactory.create()
    const role = await RoleFactory.create()
    const circle = await CircleFactory.merge({ userId: user.id }).create()

    await service.assignRoleToUser(user.id, role.id, circle.id)

    // Vérification en interrogeant la table des attributions
    const attribution = await Attribution.query()
      .where('user_id', user.id)
      .where('role_id', role.id)
      .where('circle_id', circle.id)
      .first()

    assert.exists(attribution)
  })

  test('listRolesByUser doit retourner le rôle assigné à un utilisateur', async ({ assert }) => {
    const user = await UserFactory.create()
    const role = await RoleFactory.create()

    const circle = await CircleFactory.merge({ userId: user.id }).create()

    await service.assignRoleToUser(user.id, role.id, circle.id)

    const roles = await service.getRolesInCircle(user.id, circle.id)

    assert.isArray(roles)
    assert.equal(roles.length, 1)
    assert.equal(roles[0].id, role.id)
  })

  test('listRolesByUser doit retourner les rôles assignés à un utilisateur', async ({ assert }) => {
    const user = await UserFactory.create()
    const role = await RoleFactory.create()
    const roleb = await RoleFactory.create()

    const circle = await CircleFactory.merge({ userId: user.id }).create()

    await service.assignRoleToUser(user.id, role.id, circle.id)
    await service.assignRoleToUser(user.id, roleb.id, circle.id)

    const roles = await service.getRolesInCircle(user.id, circle.id)

    assert.isArray(roles)
    assert.equal(roles.length, 2)
    assert.equal(roles[0].id, role.id)
    assert.equal(roles[1].id, roleb.id)
  })

  test("listUsersByRoleAndCircle doit retourner l'utilisateur assigné à un rôle dans un cercle", async ({
    assert,
  }) => {
    const user = await UserFactory.create()
    const role = await RoleFactory.create()

    const circle = await CircleFactory.merge({ userId: user.id }).create()

    await service.assignRoleToUser(user.id, role.id, circle.id)

    const users = await service.getUsersInCircle(circle.id)

    assert.isArray(users)
    assert.equal(users.length, 1)
    assert.equal(users[0].id, user.id)
  })

  test('listUsersByRoleAndCircle doit retourner les utilisateurs assignés à un rôle dans un cercle', async ({
    assert,
  }) => {
    const user = await UserFactory.create()
    const userb = await UserFactory.create()
    const role = await RoleFactory.create()

    const circle = await CircleFactory.merge({ userId: user.id }).create()

    await service.assignRoleToUser(user.id, role.id, circle.id)
    await service.assignRoleToUser(userb.id, role.id, circle.id)

    const users = await service.getUsersInCircle(circle.id)

    assert.isArray(users)
    assert.equal(users.length, 2)
    assert.equal(users[0].id, user.id)
    assert.equal(users[1].id, userb.id)
  })

  test('removeRole doit supprimer l’attribution d’un utilisateur', async ({ assert }) => {
    const user = await UserFactory.create()
    const role = await RoleFactory.create()
    const circle = await CircleFactory.merge({ userId: user.id }).create()

    // Création de l'attribution
    await service.assignRoleToUser(user.id, role.id, circle.id)

    let attribution = await Attribution.query()
      .where('user_id', user.id)
      .where('role_id', role.id)
      .where('circle_id', circle.id)
      .first()
    assert.exists(attribution)

    // Suppression de l'attribution via le service
    await service.removeRoleFromUser(user.id, role.id, circle.id)

    attribution = await Attribution.query()
      .where('user_id', user.id)
      .where('role_id', role.id)
      .where('circle_id', circle.id)
      .first()
    assert.isNull(attribution)
  })
})
