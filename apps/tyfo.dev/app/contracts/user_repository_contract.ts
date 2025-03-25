// contracts/user_repository_contract.ts
import User from '#models/user'

export abstract class UserRepositoryContract {
  abstract create(data: Partial<User>): Promise<User>
  abstract update(userUuid: string, data: Partial<User>): Promise<User>
  abstract delete(userUuid: string): Promise<void>
  abstract findByUuid(userUuid: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract list(filters: Record<string, any>): Promise<User[]>
  abstract assignRole(userUuid: string, roleId: string): Promise<void>
}
