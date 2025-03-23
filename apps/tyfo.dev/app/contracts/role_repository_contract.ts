// contracts/role_repository_contract.ts
import Role from '#models/role'

export abstract class RoleRepositoryContract {
  abstract create(data: Partial<Role>): Promise<Role>
  abstract findByName(name: string): Promise<Role | null>
}
