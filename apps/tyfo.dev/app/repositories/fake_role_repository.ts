// repositories/fake_role_repository.ts
import Role from '#models/role'
import { RoleRepositoryContract } from '#contracts/role_repository_contract'

export default class FakeRoleRepository implements RoleRepositoryContract {
  private roles: Role[] = []

  public async create(data: Partial<Role>): Promise<Role> {
    const role = new Role()
    role.fill({
      id: this.roles.length + 1,
      uuid: `uuid-${this.roles.length + 1}`,
      ...data,
    })
    this.roles.push(role)
    return role
  }

  public async findByName(name: string): Promise<Role | null> {
    return this.roles.find((role) => role.name === name) || null
  }
}
