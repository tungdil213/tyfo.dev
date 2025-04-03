// repositories/user_repository.ts
import Attribution from '#models/attribution'
import Circle from '#models/circle'
import Role from '#models/role'
import User from '#models/user'
import { UserRepositoryContract } from '#repositories/contracts/user_repository_contract'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

/**
 * Implémentation du repository pour la gestion des utilisateurs
 */
export default class UserRepository implements UserRepositoryContract {
  /**
   * Crée un nouvel utilisateur
   * @param data Les données de l'utilisateur à créer
   * @returns L'utilisateur créé
   */
  public async create(data: Partial<User>): Promise<User> {
    return await User.create({
      uuid: randomUUID(), // Générer systématiquement un nouvel UUID
      ...data,
    })
  }

  /**
   * Met à jour un utilisateur existant
   * @param userUuid UUID de l'utilisateur à mettre à jour
   * @param data Les données à mettre à jour
   * @returns L'utilisateur mis à jour
   * @throws Error si l'utilisateur n'est pas trouvé
   */
  public async update(userUuid: string, data: Partial<User>): Promise<User> {
    const user = await this.findByUuidOrFail(userUuid)
    user.merge(data)
    await user.save()
    return user
  }

  /**
   * Supprime logiquement un utilisateur (soft delete)
   * @param userUuid UUID de l'utilisateur à supprimer
   * @throws Error si l'utilisateur n'est pas trouvé
   */
  public async delete(userUuid: string): Promise<void> {
    const user = await this.findByUuidOrFail(userUuid)
    user.deletedAt = DateTime.now()
    await user.save()
  }

  /**
   * Recherche un utilisateur par son UUID
   * @param userUuid UUID de l'utilisateur à trouver
   * @returns L'utilisateur trouvé ou null
   */
  public async findByUuid(userUuid: string): Promise<User | null> {
    return await User.query().whereNull('deleted_at').where('uuid', userUuid).first()
  }

  /**
   * Recherche un utilisateur par son UUID avec une erreur si non trouvé
   * @param userUuid UUID de l'utilisateur à trouver
   * @returns L'utilisateur trouvé
   * @throws Error si l'utilisateur n'est pas trouvé
   */
  private async findByUuidOrFail(userUuid: string): Promise<User> {
    const user = await this.findByUuid(userUuid)
    if (!user) {
      throw new Error(`Utilisateur avec UUID ${userUuid} non trouvé`)
    }
    return user
  }

  /**
   * Recherche un utilisateur par son email
   * @param email Email de l'utilisateur à trouver
   * @returns L'utilisateur trouvé ou null
   */
  public async findByEmail(email: string): Promise<User | null> {
    return await User.query().whereNull('deleted_at').where('email', email).first()
  }

  /**
   * Liste les utilisateurs avec filtres optionnels
   * @param filters Filtres à appliquer (email, fullName, etc.)
   * @returns Liste des utilisateurs filtrés
   */
  public async list(filters: Record<string, any> = {}): Promise<User[]> {
    const query = User.query().whereNull('deleted_at')

    // Appliquer les filtres dynamiquement
    if (filters.email) {
      query.where('email', filters.email)
    }

    if (filters.fullName) {
      query.where('fullName', 'like', `%${filters.fullName}%`)
    }

    // Ajouter d'autres filtres selon vos besoins

    return await query.exec()
  }

  /**
   * Liste les rôles d'un utilisateur
   * @param userUuid UUID de l'utilisateur
   * @returns Liste des rôles de l'utilisateur
   */
  public async listRolesByUser(userUuid: string): Promise<Role[]> {
    const user = await this.findByUuidOrFail(userUuid)
    return await user.related('roles').query()
  }

  /**
   * Attribue un rôle à un utilisateur
   * @param userUuid UUID de l'utilisateur
   * @param roleUuid UUID du rôle
   */
  public async assignRole(userUuid: string, roleUuid: string): Promise<void> {
    const user = await this.findByUuidOrFail(userUuid)
    const role = await Role.findByOrFail('uuid', roleUuid)

    // Vérifier si le rôle est déjà attribué
    const existingAttribution = await Attribution.query()
      .where('user_id', user.id)
      .where('role_id', role.id)
      .first()

    if (!existingAttribution) {
      // Créer l'attribution avec un UUID
      await Attribution.create({
        uuid: randomUUID(),
        userId: user.id,
        roleId: role.id,
      })
    }
  }

  /**
   * Liste les rôles dans un cercle
   * @param circleUuid UUID du cercle
   * @returns Liste des rôles dans le cercle
   */
  public async listRolesByCircle(circleUuid: string): Promise<Role[]> {
    // Find circle ID from UUID first
    const circle = await Circle.findBy('uuid', circleUuid)
    if (!circle) return []

    // Get roles through the Attribution model which connects roles to circles
    return Role.query().whereIn('id', (query) => {
      query.from('attributions').select('role_id').where('circle_id', circle.id)
    })
  }

  /**
   * Retire un rôle d'un utilisateur
   * @param userUuid UUID de l'utilisateur
   * @param roleUuid UUID du rôle à retirer
   */
  public async removeRole(userUuid: string, roleUuid: string): Promise<void> {
    const user = await this.findByUuidOrFail(userUuid)
    await user.related('roles').detach([roleUuid])
  }
}
