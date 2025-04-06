import Permission from '#models/permission'
import Role from '#models/role'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import Repository from './base/repository.js'

export default class RoleRepository extends Repository<Role> implements RoleRepositoryContract {
  constructor() {
    super(Role)
  }

  public async findByName(name: string): Promise<Role | null> {
    return await Role.findBy('name', name)
  }

  public async getRolePermissions(roleId: number): Promise<Permission[]> {
    const role = await Role.find(roleId)
    if (!role) throw new Error(`Role with id ${roleId} not found`)

    await role.load('permissions')
    return role.permissions
  }

  public async addPermissionToRole(roleId: number, permissionId: number): Promise<void> {
    const role = await Role.find(roleId)
    if (!role) throw new Error(`Role with id ${roleId} not found`)

    const permission = await Permission.find(permissionId)
    if (!permission) throw new Error(`Permission with id ${permissionId} not found`)

    await role.related('permissions').attach([permissionId])
  }

  public async removePermissionFromRole(roleId: number, permissionId: number): Promise<void> {
    const role = await Role.find(roleId)
    if (!role) throw new Error(`Role with id ${roleId} not found`)

    await role.related('permissions').detach([permissionId])
  }

  public async hasPermission(roleId: number, permissionId: number): Promise<boolean> {
    const role = await Role.find(roleId)
    if (!role) throw new Error(`Role with id ${roleId} not found`)

    await role.load('permissions')
    return role.permissions.some((permission) => permission.id === permissionId)
  }
}
