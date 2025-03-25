// repositories/user_repository.ts
import User from '#models/user'
import { UserRepositoryContract } from '#contracts/user_repository_contract'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class UserRepository implements UserRepositoryContract {
  public async create(data: Partial<User>): Promise<User> {
    return await User.create({
      uuid: data.uuid || randomUUID(), // 🔥 Assurer que `uuid` est toujours défini
      ...data,
    })
  }

  public async update(userUuid: string, data: Partial<User>): Promise<User> {
    const user = await User.findByOrFail('uuid', userUuid)
    user.merge(data)
    await user.save()
    return user
  }

  public async delete(userUuid: string): Promise<void> {
    const user = await User.findByOrFail('uuid', userUuid)
    user.deletedAt = DateTime.now()
    await user.save()
  }

  public async findByUuid(userUuid: string): Promise<User | null> {
    return await User.findBy('uuid', userUuid)
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }

  public async list(filters: Record<string, any>): Promise<User[]> {
    let query = User.query().whereNull('deleted_at')

    if (filters.roleId) {
      query = query.whereHas('roles', (roleQuery) => {
        roleQuery.where('roles.id', filters.roleId)
      })
    }

    return await query.orderBy('createdAt', 'desc')
  }

  public async assignRole(userUuid: string, roleId: string): Promise<void> {
    const user = await User.findByOrFail('uuid', userUuid)
    await user.related('roles').attach([roleId])
  }
}
