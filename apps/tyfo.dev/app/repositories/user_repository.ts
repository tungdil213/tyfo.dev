// repositories/user_repository.ts
import Attribution from '#models/attribution'
import Circle from '#models/circle'
import Role from '#models/role'
import User from '#models/user'
import { UserRepositoryContract } from '#repositories/contracts/user_repository_contract'
import BaseRepository from '#repositories/base/repository'
import { DateTime } from 'luxon'

/**
 * Implémentation du repository pour la gestion des utilisateurs
 */
export default class UserRepository extends BaseRepository<User> implements UserRepositoryContract {
  constructor() {
    super(User)
  }
  async softDelete(uuid: string): Promise<void> {
    const user = await User.findByOrFail('uuid', uuid)
    user.deletedAt = DateTime.now()
    await user.save()
  }
  getAll(params?: any): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
  findBy(key: string, value: any): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  async restore(uuid: string): Promise<User> {
    const user = await User.findByOrFail('uuid', uuid)
    user.deletedAt = null
    await user.save()
    return user
  }
  getUserRoles(uuid: string): Promise<Role[]> {
    throw new Error('Method not implemented.')
  }
  getUserAttributions(uuid: string): Promise<Attribution[]> {
    throw new Error('Method not implemented.')
  }
  getUserCircles(uuid: string): Promise<Circle[]> {
    throw new Error('Method not implemented.')
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }

  public async findWithRoles(uuid: string): Promise<User | null> {
    const user = await User.findBy('uuid', uuid)
    if (!user) return null

    await user.load('roles')
    return user
  }

  public async findWithCircles(uuid: string): Promise<User | null> {
    const user = await User.findBy('uuid', uuid)
    if (!user) return null

    await user.load('circles')
    return user
  }

  public async searchByName(query: string): Promise<User[]> {
    return await User.query()
      .whereILike('full_name', `%${query}%`)
      .orWhereILike('email', `%${query}%`)
  }

  public async getActiveUsers(): Promise<User[]> {
    return await User.query().whereNull('deleted_at')
  }
}
