import Permission from '#models/permission'

export abstract class PermissionRepositoryContract {
  /**
   * Assigne une permission à un rôle donné.
   * @param roleUuid UUID du rôle
   * @param permission Nom de la permission
   */
  abstract assignPermission(roleUuid: string, permission: string): Promise<void>

  /**
   * Supprime une permission d'un rôle donné.
   * @param roleUuid UUID du rôle
   * @param permission Nom de la permission
   */
  abstract removePermission(roleUuid: string, permission: string): Promise<void>

  /**
   * Vérifie si un utilisateur possède une permission donnée.
   * @param userUuid UUID de l'utilisateur
   * @param permission Nom de la permission
   * @returns `true` si l'utilisateur possède la permission, `false` sinon.
   */
  abstract checkUserPermission(userUuid: string, permission: string): Promise<boolean>

  /**
   * Récupère toutes les permissions associées à un rôle donné.
   * @param roleUuid UUID du rôle
   * @returns Liste des permissions du rôle.
   */
  abstract getRolePermissions(roleUuid: string): Promise<string[]>
}
