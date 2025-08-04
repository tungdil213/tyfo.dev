import { inject } from '@adonisjs/core'
import User from '#models/user'
import Circle from '#models/circle'
import RoleService from '#services/role_service'
import LogService from '#services/log_service'
import { ObjectRepositoryContract } from '#repositories/contracts/object_model_repository_contract'
import Permission from '#models/permission'

/**
 * Service gérant les accès aux fichiers et documents selon les permissions
 * et contrôles d'accès définis dans le système.
 */
@inject()
export default class FileAccessService {
  /**
   * Crée une nouvelle instance du service de gestion des accès aux fichiers
   * @param roleService Service de gestion des rôles et permissions
   * @param logService Service de journalisation des activités
   * @param objectRepository Repository pour les opérations sur les objets du système
   */
  constructor(
    private roleService: RoleService,
    private logService: LogService,
    private objectRepository: ObjectRepositoryContract
  ) {}

  /**
   * Vérifie si un utilisateur a une permission donnée sur un fichier
   *
   * La vérification prend en compte :
   * - Les permissions directes accordées à l'utilisateur
   * - Les permissions accordées via les cercles dont l'utilisateur est membre
   * - Les rôles spéciaux (admin a toutes les permissions)
   *
   * @param userId Identifiant UUID de l'utilisateur
   * @param fileId Identifiant UUID du fichier
   * @param permission Type de permission à vérifier
   * @returns true si l'utilisateur possède la permission, false sinon
   */
  public async checkUserFilePermission(
    userId: string,
    fileId: string,
    permission: Permission
  ): Promise<boolean> {
    const userRoles = await this.roleService.getUserRoles(userId)

    // Si l'utilisateur a un rôle admin, il a toutes les permissions
    if (userRoles.some((role) => role.name === 'admin')) {
      return true
    }

    // Vérifier les permissions spécifiques au fichier
    const filePermissions = await this.roleService.getEntityPermissions('FILE', fileId)

    // Vérifier si l'utilisateur a directement la permission requise
    const userDirectPermission = filePermissions.some(
      (p) => p.userId === userId && p.permission === permission
    )

    if (userDirectPermission) {
      return true
    }

    // Vérifier les permissions via les cercles dont l'utilisateur est membre
    const userCircles = await this.roleService.getUserCircles(userId)
    const userCircleIds = userCircles.map((circle) => circle.uuid)

    const hasCirclePermission = filePermissions.some(
      (p) => p.circleId && userCircleIds.includes(p.circleId) && p.permission === permission
    )

    return hasCirclePermission
  }

  /**
   * Accorde une permission à un utilisateur sur un fichier
   *
   * Cette méthode vérifie d'abord que l'utilisateur qui accorde la permission
   * a lui-même le droit de gérer les permissions sur le fichier.
   *
   * @param granterId Identifiant UUID de l'utilisateur qui accorde la permission
   * @param userId Identifiant UUID de l'utilisateur qui reçoit la permission
   * @param fileId Identifiant UUID du fichier concerné
   * @param permission Type de permission à accorder
   * @returns true si la permission a été accordée, false sinon (ex: droits insuffisants)
   */
  public async grantUserFilePermission(
    granterId: string,
    userId: string,
    fileId: string,
    permission: Permission
  ): Promise<boolean> {
    // Vérifier que le donneur a lui-même le droit d'accorder cette permission
    const canGrant = await this.checkUserFilePermission(granterId, fileId, 'MANAGE_PERMISSIONS')

    if (!canGrant) {
      return false
    }

    // Accorder la permission
    await this.roleService.addEntityPermission({
      entityType: 'FILE',
      entityId: fileId,
      userId,
      permission,
      grantedBy: granterId,
    })

    // Journaliser l'action
    const granter = await User.findByUuid(granterId)
    const file = await File.findByUuid(fileId)

    if (granter && file) {
      await this.logService.logAction(
        granter,
        'PERMISSION_GRANT',
        'FILE',
        fileId,
        `L'utilisateur ${granter.fullName || granter.email} a accordé la permission ${permission} sur le fichier "${file.name}" à l'utilisateur ${userId}`
      )
    }

    return true
  }

  /**
   * Révoque une permission d'un utilisateur sur un fichier
   *
   * Cette méthode vérifie d'abord que l'utilisateur qui révoque la permission
   * a lui-même le droit de gérer les permissions sur le fichier.
   *
   * @param revokerId Identifiant UUID de l'utilisateur qui révoque la permission
   * @param userId Identifiant UUID de l'utilisateur dont la permission est révoquée
   * @param fileId Identifiant UUID du fichier concerné
   * @param permission Type de permission à révoquer
   * @returns true si la permission a été révoquée, false sinon (ex: droits insuffisants)
   */
  public async revokeUserFilePermission(
    revokerId: string,
    userId: string,
    fileId: string,
    permission: Permission
  ): Promise<boolean> {
    // Vérifier que le révocateur a lui-même le droit de gérer les permissions
    const canRevoke = await this.checkUserFilePermission(revokerId, fileId, 'MANAGE_PERMISSIONS')

    if (!canRevoke) {
      return false
    }

    // Révoquer la permission
    await this.roleService.removeEntityPermission({
      entityType: 'FILE',
      entityId: fileId,
      userId,
      permission,
    })

    // Journaliser l'action
    const revoker = await User.findByUuid(revokerId)
    const file = await File.findByUuid(fileId)

    if (revoker && file) {
      await this.logService.logAction(
        revoker,
        'PERMISSION_REVOKE',
        'FILE',
        fileId,
        `L'utilisateur ${revoker.fullName || revoker.email} a révoqué la permission ${permission} sur le fichier "${file.name}" de l'utilisateur ${userId}`
      )
    }

    return true
  }

  /**
   * Accorde une permission à un cercle sur un fichier
   *
   * Cette méthode permet d'attribuer une permission à tous les membres d'un cercle.
   * Elle vérifie d'abord que l'utilisateur qui accorde la permission
   * a lui-même le droit de gérer les permissions sur le fichier.
   *
   * @param granterId Identifiant UUID de l'utilisateur qui accorde la permission
   * @param circleId Identifiant UUID du cercle qui reçoit la permission
   * @param fileId Identifiant UUID du fichier concerné
   * @param permission Type de permission à accorder
   * @returns true si la permission a été accordée, false sinon (ex: droits insuffisants)
   */
  public async grantCircleFilePermission(
    granterId: string,
    circleId: string,
    fileId: string,
    permission: Permission
  ): Promise<boolean> {
    // Vérifier que le donneur a lui-même le droit d'accorder cette permission
    const canGrant = await this.checkUserFilePermission(granterId, fileId, 'MANAGE_PERMISSIONS')

    if (!canGrant) {
      return false
    }

    // Accorder la permission au cercle
    await this.roleService.addEntityPermission({
      entityType: 'FILE',
      entityId: fileId,
      circleId,
      permission,
      grantedBy: granterId,
    })

    // Journaliser l'action
    const granter = await User.findByUuid(granterId)
    const file = await File.findByUuid(fileId)
    const circle = await Circle.findByUuid(circleId)

    if (granter && file && circle) {
      await this.logService.logAction(
        granter,
        'PERMISSION_GRANT',
        'FILE',
        fileId,
        `L'utilisateur ${granter.fullName || granter.email} a accordé la permission ${permission} sur le fichier "${file.name}" au cercle "${circle.name}"`
      )
    }

    return true
  }

  /**
   * Définit des permissions temporaires sur un fichier
   *
   * Cette méthode permet d'accorder une permission qui expirera automatiquement
   * à une date spécifiée. La permission peut être accordée soit à un utilisateur
   * soit à un cercle entier.
   *
   * @param granterId Identifiant UUID de l'utilisateur qui accorde la permission
   * @param targetId Identifiant UUID de l'utilisateur ou du cercle cible
   * @param fileId Identifiant UUID du fichier concerné
   * @param permission Type de permission à accorder
   * @param expiresAt Date d'expiration de la permission temporaire
   * @param isCircle Si true, targetId est l'ID d'un cercle; si false, c'est l'ID d'un utilisateur
   * @returns true si la permission temporaire a été accordée, false sinon
   */
  public async setTemporaryPermission(
    granterId: string,
    targetId: string,
    fileId: string,
    permission: Permission,
    expiresAt: Date,
    isCircle: boolean = false
  ): Promise<boolean> {
    // Vérifier que le donneur a lui-même le droit d'accorder cette permission
    const canGrant = await this.checkUserFilePermission(granterId, fileId, 'MANAGE_PERMISSIONS')

    if (!canGrant) {
      return false
    }

    // Accorder la permission temporaire
    await this.roleService.addEntityPermission({
      entityType: 'FILE',
      entityId: fileId,
      userId: isCircle ? undefined : targetId,
      circleId: isCircle ? targetId : undefined,
      permission,
      grantedBy: granterId,
      expiresAt,
    })

    // Journaliser l'action
    const granter = await User.findByUuid(granterId)
    const file = await File.findByUuid(fileId)
    let targetName = targetId

    if (isCircle) {
      const circle = await Circle.findByUuid(targetId)
      if (circle) targetName = `cercle "${circle.name}"`
    } else {
      const user = await User.findByUuid(targetId)
      if (user) targetName = `utilisateur ${user.fullName || user.email}`
    }

    if (granter && file) {
      await this.logService.logAction(
        granter,
        'TEMP_PERMISSION_GRANT',
        'FILE',
        fileId,
        `L'utilisateur ${granter.fullName || granter.email} a accordé la permission temporaire ${permission} (expire le ${expiresAt.toISOString()}) sur le fichier "${file.name}" au ${targetName}`
      )
    }

    return true
  }

  /**
   * Vérifie si une permission d'héritage existe entre deux fichiers
   *
   * Détermine si les permissions du fichier source sont héritées par le fichier cible.
   * Dans l'implémentation actuelle, l'héritage n'est vrai que si les fichiers sont identiques.
   *
   * @param sourceFileId Identifiant UUID du fichier source (dont les permissions sont héritées)
   * @param targetFileId Identifiant UUID du fichier cible (qui hérite des permissions)
   * @returns true si une relation d'héritage existe, false sinon
   */
  public async checkPermissionInheritance(
    sourceFileId: string,
    targetFileId: string
  ): Promise<boolean> {
    // Pour l'instant, nous implémentons une solution temporaire
    // Dans une implémentation réelle, cette méthode devrait vérifier si une relation d'héritage
    // existe entre les deux fichiers dans une table dédiée

    // Cette implémentation simplifiée suppose toujours qu'il n'y a pas de relation d'héritage
    // sauf si les fichiers sont identiques
    return sourceFileId === targetFileId
  }

  /**
   * Établit une relation d'héritage de permissions entre deux fichiers
   *
   * Crée une relation qui permet au fichier cible d'hériter automatiquement
   * des permissions définies sur le fichier source. L'utilisateur doit avoir
   * des droits suffisants sur les deux fichiers.
   *
   * @param userId Identifiant UUID de l'utilisateur qui établit la relation d'héritage
   * @param sourceFileId Identifiant UUID du fichier source (dont les permissions sont héritées)
   * @param targetFileId Identifiant UUID du fichier cible (qui hérite des permissions)
   * @returns true si la relation d'héritage a été établie, false sinon
   */
  public async setPermissionInheritance(
    userId: string,
    sourceFileId: string,
    targetFileId: string
  ): Promise<boolean> {
    // Vérifier que l'utilisateur a le droit de gérer les permissions sur les deux fichiers
    const canManageSource = await this.checkUserFilePermission(
      userId,
      sourceFileId,
      'MANAGE_PERMISSIONS'
    )
    const canManageTarget = await this.checkUserFilePermission(
      userId,
      targetFileId,
      'MANAGE_PERMISSIONS'
    )

    if (!canManageSource || !canManageTarget) {
      return false
    }

    // Établir la relation d'héritage
    await this.roleService.addInheritanceRelation({
      sourceEntityType: 'FILE',
      sourceEntityId: sourceFileId,
      targetEntityType: 'FILE',
      targetEntityId: targetFileId,
      createdBy: Number.parseInt(userId, 10), // Conversion de string à number
    })

    // Journaliser l'action
    const user = await User.findByUuid(userId)
    const sourceFile = await File.findByUuid(sourceFileId)
    const targetFile = await File.findByUuid(targetFileId)

    if (user && sourceFile && targetFile) {
      await this.logService.logAction(
        user,
        'PERMISSION_INHERITANCE',
        'FILE',
        targetFileId,
        `L'utilisateur ${user.fullName || user.email} a configuré le fichier "${targetFile.name}" pour hériter des permissions du fichier "${sourceFile.name}"`
      )
    }

    return true
  }
}
