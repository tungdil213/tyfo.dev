// services/user_service.ts
import { inject } from '@adonisjs/core'
import Role from '#models/role'
import User from '#models/user'
import UserRepository from '#repositories/user_repository'
import { UserServiceContract } from '#services/contracts/user_service_contract'
import NotFoundException from '#exceptions/not_found_exception'
import CircleRepository from '#repositories/circle_repository'
import RoleRepository from '#repositories/role_repository'
import AttributionRepository from '#repositories/attribution_repository'

/**
 * Service pour la gestion des utilisateurs
 * Implémente la logique métier entre les contrôleurs et le repository
 */
@inject()
export default class UserService implements UserServiceContract {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private circleRepository: CircleRepository,
    private attributionRepository: AttributionRepository
  ) {}

  /**
   * Crée un nouvel utilisateur
   * @param data Les données de l'utilisateur à créer
   * @returns L'utilisateur créé
   */
  public async createUser(data: Partial<User>): Promise<User> {
    return await this.userRepository.create(data)
  }

  /**
   * Met à jour un utilisateur existant
   * @param userUuid UUID de l'utilisateur à mettre à jour
   * @param data Les données à mettre à jour
   * @returns L'utilisateur mis à jour
   * @throws Error si l'utilisateur n'est pas trouvé
   */
  public async updateUser(userUuid: string, data: Partial<User>): Promise<User> {
    return await this.userRepository.update(userUuid, data)
  }

  /**
   * Supprime logiquement un utilisateur (soft delete)
   * @param userUuid UUID de l'utilisateur à supprimer
   * @throws Error si l'utilisateur n'est pas trouvé
   */
  public async deleteUser(userUuid: string): Promise<void> {
    await this.userRepository.delete(userUuid)
  }

  /**
   * Recherche un utilisateur par son UUID
   * @param userUuid UUID de l'utilisateur à trouver
   * @returns L'utilisateur trouvé
   * @throws Error si l'utilisateur n'est pas trouvé
   */
  public async getUserByUuid(userUuid: string): Promise<User> {
    const user = await this.userRepository.findByUuid(userUuid)
    if (!user) {
      throw new Error(`Utilisateur avec UUID ${userUuid} non trouvé`)
    }
    return user
  }

  /**
   * Assigne un rôle à un utilisateur
   * @param userUuid UUID de l'utilisateur
   * @param roleUuid UUID du rôle
   */
  public async assignRole(userUuid: string, roleUuid: string, circleUuid: string): Promise<void> {
    const user = await this.userRepository.findByUuid(userUuid)
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé')
    }

    const role = await this.roleRepository.findByUuid(roleUuid)
    if (!role) {
      throw new NotFoundException('Rôle non trouvé')
    }

    const circle = await this.circleRepository.findByUuid(circleUuid)
    if (!circle) {
      throw new NotFoundException('Cercle non trouvé')
    }

    // Vérifier que l'utilisateur n'a pas déjà ce rôle dans ce cercle
    const existingAttribution = await this.attributionRepository.findByUserRoleCircle(
      user.id,
      role.id,
      circle.id
    )
    if (existingAttribution) {
      throw new Error('Cet utilisateur possède déjà ce rôle dans ce cercle')
    }

    // Ajouter le rôle avec attach()
    await user.related('roles').attach({
      [role.id]: { circle_id: circle.id },
    })
  }

  /**
   * Retire un rôle d'un utilisateur
   * @param userUuid UUID de l'utilisateur
   * @param roleUuid UUID du rôle à retirer
   */
  public async removeRole(userUuid: string, roleUuid: string): Promise<void> {
    await this.userRepository.removeRole(userUuid, roleUuid)
  }

  /**
   * Liste les utilisateurs selon les filtres
   * @param filters Filtres à appliquer
   * @returns Liste d'utilisateurs filtrée
   */
  public async listUsers(filters: Record<string, any> = {}): Promise<User[]> {
    return await this.userRepository.list(filters)
  }

  /**
   * Liste les rôles d'un utilisateur spécifique
   * @param userUuid UUID de l'utilisateur
   * @returns Liste des rôles de l'utilisateur
   */
  public async listRolesByUser(userUuid: string): Promise<Role[]> {
    return await this.userRepository.listRolesByUser(userUuid)
  }

  /**
   * Liste les utilisateurs avec pagination
   * @param filters Les filtres à appliquer incluant page et limit
   * @returns Résultat paginé des utilisateurs
   */
  public async listUsersWithPagination(filters: Record<string, any> = {}) {
    return await this.userRepository.list(filters)
  }

  /**
   * Recherche un utilisateur par son email
   * @param email Email de l'utilisateur
   * @returns L'utilisateur trouvé ou null
   */
  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email)
  }
}
