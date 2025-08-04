import { test } from '@japa/runner'
import sinon from 'sinon'
import { DateTime } from 'luxon'

import RoleService from '#services/role_service'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import { AttributionRepositoryContract } from '#repositories/contracts/attribution_repository_contract'
import User from '#models/user'
import Role from '#models/role'
import Permission from '#models/permission'
import Circle from '#models/circle'
import Attribution from '#models/attribution'
import NotFoundException from '#exceptions/not_found_exception'
import { generateUuid } from '#utils/uuid_helper'

// Mock du modèle User
class MockUser implements Partial<User> {
  constructor(
    public id: number,
    public uuid: string,
    public email: string,
    public fullName?: string
  ) {}
}

// Mock du modèle Role
class MockRole implements Partial<Role> {
  public permissions: MockPermission[] = []
  constructor(
    public id: number,
    public uuid: string,
    public name: string
  ) {}

  async load(relation: string) {
    // Simuler le chargement de relations
    return this
  }

  related(relation: string) {
    return {
      attach: async (ids: number[]) => {
        // Simuler l'ajout de permissions
      },
      detach: async (ids: number[]) => {
        // Simuler la suppression de permissions
      },
    }
  }
}

// Mock du modèle Permission
class MockPermission implements Partial<Permission> {
  constructor(
    public id: number,
    public action: string
  ) {}
}

// Mock du modèle Circle
class MockCircle implements Partial<Circle> {
  constructor(
    public id: number,
    public uuid: string,
    public name: string
  ) {}
}

// Mock du modèle Attribution
class MockAttribution implements Partial<Attribution> {
  constructor(
    public id: number,
    public userId: number,
    public roleId: number,
    public circleId: number | null
  ) {}
}

// Mock du repository de rôles
class TestRoleRepository implements Partial<RoleRepositoryContract> {
  private permissions: Map<number, number[]> = new Map()

  async findByName(name: string) {
    return null
  }

  async getRolePermissions(roleId: number) {
    const permissionIds = this.permissions.get(roleId) || []
    return permissionIds.map((id) => new MockPermission(id, `permission_${id}`))
  }

  // Méthode pour aider les tests à configurer des permissions
  setRolePermissions(roleId: number, permissionIds: number[]) {
    this.permissions.set(roleId, permissionIds)
  }
}

// Mock du repository d'attributions
class TestAttributionRepository implements Partial<AttributionRepositoryContract> {
  private attributions: MockAttribution[] = []

  async create(data: any) {
    const attribution = new MockAttribution(
      this.attributions.length + 1,
      data.userId,
      data.roleId,
      data.circleId
    )
    this.attributions.push(attribution)
    return attribution
  }

  async getUserAttributions(userId: number) {
    return this.attributions.filter((attr) => attr.userId === userId)
  }

  async getCircleAttributions(circleId: number) {
    return this.attributions.filter((attr) => attr.circleId === circleId)
  }

  async getRoleAttributions(roleId: number) {
    return this.attributions.filter((attr) => attr.roleId === roleId)
  }

  async getUserAttributionsInCircle(userId: number, circleId: number) {
    return this.attributions.filter((attr) => attr.userId === userId && attr.circleId === circleId)
  }

  async hasAttribution(userId: number, roleId: number, circleId: number) {
    return this.attributions.some(
      (attr) => attr.userId === userId && attr.roleId === roleId && attr.circleId === circleId
    )
  }

  async findByUserRoleAndCircle(userId: number, roleId: number, circleId: number) {
    const attribution = this.attributions.find(
      (attr) => attr.userId === userId && attr.roleId === roleId && attr.circleId === circleId
    )
    return attribution || null
  }

  async removeAttribution(userId: number, roleId: number, circleId: number) {
    this.attributions = this.attributions.filter(
      (attr) => !(attr.userId === userId && attr.roleId === roleId && attr.circleId === circleId)
    )
  }

  // Méthode auxiliaire pour les tests
  addAttribution(userId: number, roleId: number, circleId: number | null) {
    const attribution = new MockAttribution(this.attributions.length + 1, userId, roleId, circleId)
    this.attributions.push(attribution)
    return attribution
  }

  // Méthode auxiliaire pour obtenir toutes les attributions
  getAllAttributions() {
    return this.attributions
  }

  // Méthode auxiliaire pour réinitialiser les attributions
  reset() {
    this.attributions = []
  }

  async getUserRoles(userId: number) {
    return this.attributions.filter((attr) => attr.userId === userId)
  }

  async getCircleAttributions(circleId: number) {
    return this.attributions.filter((attr) => attr.circleId === circleId)
  }
}

test.group('RoleService', (group) => {
  let service: RoleService
  let roleRepository: TestRoleRepository
  let attributionRepository: TestAttributionRepository
  let sandbox: sinon.SinonSandbox
  let userStub: sinon.SinonStub
  let roleStub: sinon.SinonStub
  let circleStub: sinon.SinonStub
  let permissionStub: sinon.SinonStub
  let attributionCreateStub: sinon.SinonStub
  let attributionStub: any

  group.each.setup(() => {
    sandbox = sinon.createSandbox()
    roleRepository = new TestRoleRepository()
    attributionRepository = new TestAttributionRepository()
    service = new RoleService(
      roleRepository as unknown as RoleRepositoryContract,
      attributionRepository as unknown as AttributionRepositoryContract
    )

    // Stubs pour les modèles Lucid
    userStub = sandbox.stub(User, 'findBy')
    roleStub = sandbox.stub(Role, 'findBy')
    circleStub = sandbox.stub(Circle, 'findBy')
    permissionStub = sandbox.stub(Permission, 'findBy')
    attributionCreateStub = sandbox.stub(Attribution, 'create')

    // Simuler la méthode statique query() de Attribution
    const queryStub = sandbox.stub(Attribution, 'query')
    attributionStub = {
      first: sandbox.stub(),
      delete: sandbox.stub().resolves({}),
    }
    queryStub.returns({
      where: (field: string, value: any) => {
        return {
          where: (field2: string, value2: any) => {
            return {
              first: attributionStub.first,
              delete: attributionStub.delete,
            }
          },
        }
      },
    })
  })

  group.each.teardown(() => {
    sandbox.restore()
  })

  test('assignRole should create a user-role attribution', async ({ assert }) => {
    const userId = 'user-uuid'
    const roleId = 'role-uuid'
    const user = new MockUser(1, userId, 'user@example.com')
    const role = new MockRole(1, roleId, 'Admin')

    userStub.withArgs('uuid', userId).resolves(user)
    roleStub.withArgs('uuid', roleId).resolves(role)
    attributionStub.first.resolves({ id: 1, userId: 1, roleId: 1, circleId: null })

    await service.assignRole(userId, roleId)

    assert.isTrue(userStub.calledWith('uuid', userId))
    assert.isTrue(roleStub.calledWith('uuid', roleId))
    assert.isTrue(attributionCreateStub.calledOnce)
    assert.deepEqual(attributionCreateStub.firstCall.args[0], {
      userId: 1,
      roleId: 1,
      circleId: null,
    })
  })

  test('assignRole should throw NotFoundException if user not found', async ({ assert }) => {
    // Setup
    userStub.withArgs('uuid', 'non-existent').resolves(null)

    // Assertion
    try {
      await service.assignRole('non-existent', 'role-uuid')
      assert.fail('Expected method to throw NotFoundException')
    } catch (error) {
      assert.equal(error.name, 'NotFoundException')
    }
  })

  test('assignRole should throw if role not found', async ({ assert }) => {
    const user = new MockUser(1, 'user-uuid', 'user@example.com')
    userStub.withArgs('uuid', 'user-uuid').resolves(user)
    roleStub.withArgs('uuid', 'non-existent').resolves(null)

    try {
      await service.assignRole('user-uuid', 'non-existent')
      assert.fail('Expected method to throw NotFoundException')
    } catch (error) {
      assert.equal(error.name, 'NotFoundException')
    }
  })

  test('removeRole should throw if user not found', async ({ assert }) => {
    userStub.withArgs('uuid', 'non-existent').resolves(null)

    try {
      await service.removeRole('non-existent', 'role-uuid')
      assert.fail('Expected method to throw NotFoundException')
    } catch (error) {
      assert.equal(error.name, 'NotFoundException')
    }
  })

  test('removeRole should throw if role not found', async ({ assert }) => {
    userStub.withArgs('uuid', 'user-uuid').resolves(new MockUser(1, 'user-uuid'))
    roleStub.withArgs('uuid', 'non-existent').resolves(null)

    try {
      await service.removeRole('user-uuid', 'non-existent')
      assert.fail('Expected method to throw NotFoundException')
    } catch (error) {
      assert.equal(error.name, 'NotFoundException')
    }
  })

  test('removeRole should delete user-role attributions', async ({ assert }) => {
    const userId = 'user-uuid'
    const roleId = 'role-uuid'
    const user = new MockUser(1, userId, 'user@example.com')
    const role = new MockRole(1, roleId, 'Admin')

    userStub.withArgs('uuid', userId).resolves(user)
    roleStub.withArgs('uuid', roleId).resolves(role)

    await service.removeRole(userId, roleId)

    assert.isTrue(userStub.calledWith('uuid', userId))
    assert.isTrue(roleStub.calledWith('uuid', roleId))
  })

  test('assignPermission should add permission to role', async ({ assert }) => {
    const roleUuid = 'role-uuid'
    const permissionAction = 'READ_FILES'
    const role = new MockRole(1, roleUuid, 'Admin')
    const permission = new MockPermission(1, permissionAction)

    roleStub.withArgs('uuid', roleUuid).resolves(role)
    permissionStub.withArgs('action', permissionAction).resolves(permission)

    // Espionner la méthode related
    const relatedSpy = sandbox.spy(role, 'related')

    await service.assignPermission(roleUuid, permissionAction)

    assert.isTrue(roleStub.calledWith('uuid', roleUuid))
    assert.isTrue(permissionStub.calledWith('action', permissionAction))
    assert.isTrue(relatedSpy.calledWith('permissions'))
  })

  test('assignPermission should create permission if not exists', async ({ assert }) => {
    const roleUuid = 'role-uuid'
    const permissionAction = 'NEW_PERMISSION'
    const role = new MockRole(1, roleUuid, 'Admin')

    roleStub.withArgs('uuid', roleUuid).resolves(role)
    permissionStub.withArgs('action', permissionAction).resolves(null)

    const permissionCreateStub = sandbox
      .stub(Permission, 'create')
      .resolves(new MockPermission(1, permissionAction))

    // Espionner la méthode related
    const relatedSpy = sandbox.spy(role, 'related')

    await service.assignPermission(roleUuid, permissionAction)

    assert.isTrue(roleStub.calledWith('uuid', roleUuid))
    assert.isTrue(permissionStub.calledWith('action', permissionAction))
    assert.isTrue(permissionCreateStub.calledOnce)
    assert.isTrue(relatedSpy.calledWith('permissions'))
  })

  test('removePermission should detach permission from role', async ({ assert }) => {
    const roleUuid = 'role-uuid'
    const permissionAction = 'READ_FILES'
    const role = new MockRole(1, roleUuid, 'Admin')
    const permission = new MockPermission(1, permissionAction)

    roleStub.withArgs('uuid', roleUuid).resolves(role)
    permissionStub.withArgs('action', permissionAction).resolves(permission)

    // Espionner la méthode related
    const relatedSpy = sandbox.spy(role, 'related')

    await service.removePermission(roleUuid, permissionAction)

    assert.isTrue(roleStub.calledWith('uuid', roleUuid))
    assert.isTrue(permissionStub.calledWith('action', permissionAction))
    assert.isTrue(relatedSpy.calledWith('permissions'))
  })

  test('checkUserPermission should return true if user has permission', async ({ assert }) => {
    const userUuid = 'user-uuid'
    const permissionAction = 'READ_FILES'
    const user = new MockUser(1, userUuid, 'user@example.com')
    const permission = new MockPermission(1, permissionAction)

    userStub.withArgs('uuid', userUuid).resolves(user)
    permissionStub.withArgs('action', permissionAction).resolves(permission)

    // Configurer attribution et permissions
    attributionRepository.addAttribution(1, 1, null) // Attribution globale
    roleRepository.setRolePermissions(1, [1]) // Role 1 a permission 1

    const result = await service.checkUserPermission(userUuid, permissionAction)

    assert.isTrue(result)
  })

  test('checkUserPermission should return false if user does not have permission', async ({
    assert,
  }) => {
    const userUuid = 'user-uuid'
    const permissionAction = 'ADMIN_ACTION'
    const user = new MockUser(1, userUuid, 'user@example.com')
    const permission = new MockPermission(2, permissionAction)

    userStub.withArgs('uuid', userUuid).resolves(user)
    permissionStub.withArgs('action', permissionAction).resolves(permission)

    // Configurer attribution sans la permission requise
    attributionRepository.addAttribution(1, 1, null)
    roleRepository.setRolePermissions(1, [1]) // Role 1 a permission 1, mais pas 2

    const result = await service.checkUserPermission(userUuid, permissionAction)

    assert.isFalse(result)
  })

  test('listRoles should return all roles', async ({ assert }) => {
    const rolesQueryStub = sandbox
      .stub(Role, 'all')
      .resolves([new MockRole(1, 'role1-uuid', 'Admin'), new MockRole(2, 'role2-uuid', 'Editor')])

    const roles = await service.listRoles()

    assert.isTrue(rolesQueryStub.calledOnce)
    assert.equal(roles.length, 2)
    assert.equal(roles[0].id, 'role1-uuid')
    assert.equal(roles[0].name, 'Admin')
    assert.equal(roles[1].id, 'role2-uuid')
    assert.equal(roles[1].name, 'Editor')
  })

  test('getRolePermissions should return permissions for role', async ({ assert }) => {
    const roleUuid = 'role-uuid'
    const role = new MockRole(1, roleUuid, 'Admin')
    role.permissions = [new MockPermission(1, 'READ'), new MockPermission(2, 'WRITE')]

    roleStub.withArgs('uuid', roleUuid).resolves(role)

    const permissions = await service.getRolePermissions(roleUuid)

    assert.isTrue(roleStub.calledWith('uuid', roleUuid))
    assert.equal(permissions.length, 2)
    assert.equal(permissions[0], 'READ')
    assert.equal(permissions[1], 'WRITE')
  })

  test('listRolesByCircleUuid should return roles for circle', async ({ assert }) => {
    const circleUuid = 'circle-uuid'
    const circle = new MockCircle(1, circleUuid, 'Team A')

    circleStub.withArgs('uuid', circleUuid).resolves(circle)

    // Configurer attributions dans le cercle
    attributionRepository.addAttribution(1, 1, 1) // user 1, role 1, circle 1
    attributionRepository.addAttribution(2, 2, 1) // user 2, role 2, circle 1

    // Mock Role.query().whereIn() pour retourner les rôles
    const mockRoles = [
      new MockRole(1, 'role1-uuid', 'Role 1'),
      new MockRole(2, 'role2-uuid', 'Role 2'),
    ]
    const mockQueryBuilder = {
      whereIn: sandbox.stub().returnsThis(),
    }
    // Create a Role.query stub using the sandbox to ensure proper cleanup
    const roleQueryStub = sandbox.stub(Role, 'query').returns(mockQueryBuilder as any)
    // Simuler le comportement de whereIn en retournant les rôles mockés
    mockQueryBuilder.whereIn.withArgs('id', [1, 2]).resolves(mockRoles)

    const roles = await service.listRolesByCircleUuid(circleUuid)

    assert.isTrue(circleStub.calledWith('uuid', circleUuid))
    assert.equal(roles.length, 2)
    assert.equal(roles[0].id, 1)
    assert.equal(roles[1].id, 2)
  })

  test('listRolesByCircleAndUser should return user roles in circle', async ({ assert }) => {
    const circleUuid = 'circle-uuid'
    const userId = 1
    const circle = new MockCircle(1, circleUuid, 'Team A')

    circleStub.withArgs('uuid', circleUuid).resolves(circle)

    // Configurer attributions
    attributionRepository.addAttribution(userId, 1, 1) // user 1, role 1, circle 1
    attributionRepository.addAttribution(userId, 2, 1) // user 1, role 2, circle 1
    attributionRepository.addAttribution(2, 3, 1) // user 2, role 3, circle 1 (ne devrait pas être inclus)

    // Mock Role.query().whereIn() pour retourner les rôles
    const mockRoles = [
      new MockRole(1, 'role1-uuid', 'Role 1'),
      new MockRole(2, 'role2-uuid', 'Role 2'),
    ]
    const mockQueryBuilder = {
      whereIn: sandbox.stub().returnsThis(),
    }
    // Create a Role.query stub using the sandbox to ensure proper cleanup
    const roleQueryStub = sandbox.stub(Role, 'query').returns(mockQueryBuilder as any)
    // Simuler le comportement de whereIn en retournant les rôles mockés
    mockQueryBuilder.whereIn.withArgs('id', [1, 2]).resolves(mockRoles)

    const roles = await service.listRolesByCircleAndUser(circleUuid, userId)

    assert.isTrue(circleStub.calledWith('uuid', circleUuid))
    assert.equal(roles.length, 2)
    assert.equal(roles[0].id, 1)
    assert.equal(roles[1].id, 2)
  })
})
