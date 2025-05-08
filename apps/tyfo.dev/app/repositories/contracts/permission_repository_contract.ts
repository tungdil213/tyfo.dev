import Permission from '#models/permission'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class PermissionRepositoryContract extends BaseRepositoryContract<Permission> {
  /**
   * Trouve une permission par son action
   * @param action Le nom de l'action
   * @returns La permission correspondante
   */
  abstract findByAction(action: string): Promise<Permission | null>

  /**
   * Récupère toutes les permissions attribuées à un rôle
   * @param roleId Identifiant du rôle
   * @returns Liste des permissions du rôle
   */
  abstract getPermissionsForRole(roleId: number): Promise<Permission[]>

  /**
   * Ajoute une permission à un rôle
   * @param roleId Identifiant du rôle
   * @param permissionId Identifiant de la permission
   * @returns void
   */
  abstract addPermissionToRole(roleId: number, permissionId: number): Promise<void>

  /**
   * Retire une permission d'un rôle
   * @param roleId Identifiant du rôle
   * @param permissionId Identifiant de la permission
   * @returns void
   */
  abstract removePermissionFromRole(roleId: number, permissionId: number): Promise<void>

  /**
   * Vérifie si un rôle possède une permission spécifique
   * @param roleId Identifiant du rôle
   * @param permissionId Identifiant de la permission
   * @returns true si le rôle a la permission, false sinon
   */
  abstract roleHasPermission(roleId: number, permissionId: number): Promise<boolean>

  /**
   * Vérifie si un utilisateur a une permission spécifique dans un cercle donné
   * via ses attributions de rôles
   * @param userId Identifiant de l'utilisateur
   * @param permissionAction Nom de l'action de permission
   * @param circleId Identifiant du cercle
   * @returns true si l'utilisateur a la permission, false sinon
   */
  abstract userHasPermission(
    userId: number,
    permissionAction: string,
    circleId: number
  ): Promise<boolean>

  /**
   * Obtient toutes les permissions d'un utilisateur dans un cercle
   * @param userId Identifiant de l'utilisateur
   * @param circleId Identifiant du cercle
   * @returns Liste des permissions
   */
  abstract getUserPermissions(userId: number, circleId: number): Promise<Permission[]>
}
