// repositories/user_repository.ts
import User from '#models/user'
import { UserRepositoryContract } from '#contracts/user_repository_contract'

export default class UserRepository implements UserRepositoryContract {
  public async create(data: Partial<User>): Promise<User> {
    return await User.create(data)
  }

  public async update(userUuid: string, data: Partial<User>): Promise<User> {
    const user = await User.findByOrFail('uuid', userUuid)
    user.merge(data)
    await user.save()
    return user
  }

  public async archive(userUuid: string): Promise<void> {
    const user = await User.findByOrFail('uuid', userUuid)
    user.isArchived = true
    await user.save()
  }

  public async findByUuid(userUuid: string): Promise<User | null> {
    return await User.findBy('uuid', userUuid)
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }

  public async list(filters: Record<string, any>): Promise<User[]> {
    const query = User.query().preload('attributions', (attributionsQuery) => {
      attributionsQuery.preload('role')
    })

    if (filters.role) {
      query.whereHas('attributions', (attributionsQuery) => {
        attributionsQuery.whereHas('role', (roleQuery) => {
          roleQuery.where('name', filters.role) // Suppose que le rôle a une colonne `name`
        })
      })
    }

    if (filters.isArchived !== undefined) {
      query.where('isArchived', filters.isArchived)
    }

    return await query.orderBy('createdAt', 'desc')
  }
}
