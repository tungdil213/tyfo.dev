// repositories/fake_user_repository.ts
import { DateTime } from 'luxon'
import User from '#models/user'
import { UserRepositoryContract } from '#contracts/user_repository_contract'

export default class FakeUserRepository implements UserRepositoryContract {
  private users: User[] = []
  private nextId = 1

  public async create(data: Partial<User>): Promise<User> {
    const user = new User()
    user.fill({
      id: this.nextId++,
      uuid: `uuid-${this.nextId}`,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      ...data,
    })
    this.users.push(user)
    return user
  }

  public async update(userUuid: string, data: Partial<User>): Promise<User> {
    const user = this.users.find((u) => u.uuid === userUuid)
    if (!user) throw new Error('User not found')
    user.merge(data)
    user.updatedAt = DateTime.now()
    return user
  }

  public async archive(userUuid: string): Promise<void> {
    const user = this.users.find((u) => u.uuid === userUuid)
    if (!user) throw new Error('User not found')
    user.isArchived = true
    user.updatedAt = DateTime.now()
  }

  public async findByUuid(userUuid: string): Promise<User | null> {
    return this.users.find((u) => u.uuid === userUuid) || null
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null
  }

  public async list(filters: Record<string, any>): Promise<User[]> {
    let users = this.users

    if (filters.role) {
      users = users.filter((user) => {
        // Simule la relation avec les attributions et les rôles
        const hasRole = user.attributions?.some((attribution) => {
          return attribution.role?.name === filters.role
        })
        return hasRole
      })
    }

    if (filters.isArchived !== undefined) {
      users = users.filter((u) => u.isArchived === filters.isArchived)
    }

    return users
  }
}
