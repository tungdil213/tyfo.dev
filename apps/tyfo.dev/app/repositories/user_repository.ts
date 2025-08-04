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
  async getAll(params?: any): Promise<User[]> {
    let query = User.query()

    if (params) {
      // Appliquer les filtres si spécifiés
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          query = query.where(key, value)
        }
      })
    }

    return await query
  }
  async findBy(key: string, value: any): Promise<User | null> {
    return await User.findBy(key, value)
  }

  async findByUuid(uuid: string): Promise<User | null> {
    return await User.findBy('uuid', uuid)
  }
  async restore(uuid: string): Promise<User> {
    const user = await User.findByOrFail('uuid', uuid)
    user.deletedAt = null
    await user.save()
    return user
  }
  async getUserRoles(uuid: string): Promise<Role[]> {
    const user = await this.findByUuid(uuid)
    if (!user) {
      return []
    }
    await user.load('roles')
    return user.roles
  }
  getUserAttributions(uuid: string): Promise<Attribution[]> {
    throw new Error('Method not implemented.')
  }
  async getUserCircles(uuid: string): Promise<Circle[]> {
    const user = await this.findByUuid(uuid)
    if (!user) {
      return []
    }
    await user.load('circles')
    return user.circles
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

  /**
   * Assigne un rôle à un utilisateur dans un cercle
   */
  public async assignRoleToUser(
    userUuid: string,
    roleId: number | string,
    circleId?: number | string
  ): Promise<void> {
    const user = await this.findByUuid(userUuid)
    if (!user) {
      throw new Error(`Utilisateur avec UUID ${userUuid} non trouvé`)
    }

    // Convertir en ID numérique si c'est un UUID
    // Corriger l'erreur d'accès à un membre directement à partir d'une expression await
    let roleIdNumeric: number
    if (typeof roleId === 'string') {
      const role = await Role.findByOrFail('uuid', roleId)
      roleIdNumeric = role.id
    } else {
      roleIdNumeric = roleId
    }

    // Préparer l'attribution
    const attributionData: any = {
      userId: user.id,
      roleId: roleIdNumeric,
    }

    // Ajouter le cercle si spécifié
    if (circleId) {
      const circle =
        typeof circleId === 'string'
          ? await Circle.findByOrFail('uuid', circleId)
          : await Circle.findOrFail(circleId)
      attributionData.circleId = circle.id
    }

    // Créer l'attribution
    await Attribution.create(attributionData)
  }

  /**
   * Retire un rôle à un utilisateur
   */
  public async removeRoleFromUser(userUuid: string, roleId: number | string): Promise<void> {
    const user = await this.findByUuid(userUuid)
    if (!user) {
      throw new Error(`Utilisateur avec UUID ${userUuid} non trouvé`)
    }

    // Convertir en ID numérique si c'est un UUID
    const role =
      typeof roleId === 'string'
        ? await Role.findByOrFail('uuid', roleId)
        : await Role.findOrFail(roleId)
    const roleIdNumeric = role.id

    // Supprimer l'attribution
    await Attribution.query().where('user_id', user.id).where('role_id', roleIdNumeric).delete()
  }

  /**
   * Ajoute un utilisateur à un cercle
   */
  public async attachUserToCircle(userUuid: string, circleId: number | string): Promise<void> {
    const user = await this.findByUuid(userUuid)
    if (!user) {
      throw new Error(`Utilisateur avec UUID ${userUuid} non trouvé`)
    }

    // Convertir en ID numérique si c'est un UUID
    const circle =
      typeof circleId === 'string'
        ? await Circle.findByOrFail('uuid', circleId)
        : await Circle.findOrFail(circleId)
    // Mettre à jour le cercle pour y ajouter l'utilisateur (relation One-to-Many)
    circle.userId = user.id
    await circle.save()
  }
}
