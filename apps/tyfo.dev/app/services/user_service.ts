import User from '#models/user'
import { inject } from '@adonisjs/core'
import { Database } from '@adonisjs/lucid/database'
import { UserServiceContract } from '#contracts/user_service_contract'

@inject()
export default class UserService implements UserServiceContract {
  constructor(private db: Database) {}

  /**
   * Crée un nouvel utilisateur
   */
  public async createUser(data: Partial<User>): Promise<User> {
    return await this.db.transaction(async (trx) => {
      const user = new User()
      user.useTransaction(trx)
      user.fill(data)
      await user.save()
      return user
    })
  }

  /**
   * Met à jour un utilisateur
   */
  public async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const user = await User.findOrFail(userId)
    user.merge(data)
    await user.save()
    return user
  }

  /**
   * Archive un utilisateur (désactivation)
   */
  public async archiveUser(userId: string): Promise<void> {
    const user = await User.findOrFail(userId)
    user.isArchived = true
    await user.save()
  }

  /**
   * Récupère un utilisateur par son ID
   */
  public async getUserById(userId: string): Promise<User> {
    const user = await User.find(userId)
    if (!user) throw new Error('Utilisateur non trouvé')
    return user
  }

  /**
   * Liste les utilisateurs avec filtres (ex: rôle, cercle, état)
   */
  public async listUsers(filters: Record<string, any>): Promise<User[]> {
    const query = User.query()

    if (filters.role) query.where('role', filters.role)
    if (filters.isArchived !== undefined) query.where('isArchived', filters.isArchived)

    return await query.orderBy('createdAt', 'desc')
  }
}
