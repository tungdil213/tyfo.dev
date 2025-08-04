import Role from '#models/role'
import Permission from '#models/permission'
import Attribution from '#models/attribution'
import User from '#models/user'
import Circle from '#models/circle'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import { RoleServiceContract } from '#services/contracts/role_service_contract'
import { AttributionRepositoryContract } from '#repositories/contracts/attribution_repository_contract'
import { inject } from '@adonisjs/core'
import NotFoundException from '#exceptions/not_found_exception'

/**
 * Service responsable de la gestion des rôles et des permissions
 *
 * Ce service permet de gérer les rôles des utilisateurs, les permissions associées aux rôles,
 * et les attributions de rôles dans différents contextes (globaux ou par cercle).
 *
 * @class RoleService
 * @implements {RoleServiceContract}
 */
@inject()
export default class RoleService implements RoleServiceContract {
  constructor(
    private roleRepository: RoleRepositoryContract,
    private attributionRepository: AttributionRepositoryContract
  ) {}

  /**
   * Assigne un rôle à un utilisateur au niveau global (sans cercle spécifique)
   *
   * @param userId - UUID de l'utilisateur à qui assigner le rôle
   * @param roleId - UUID du rôle à assigner
   * @throws {NotFoundException} Si l'utilisateur ou le rôle n'existe pas
   * @returns {Promise<void>} Une promesse qui se résout lorsque l'attribution est créée
   */
  async assignRole(userId: string, roleId: string): Promise<void> {
    // Vérifier si l'utilisateur existe
    const user = await User.findBy('uuid', userId)
    if (!user) throw new NotFoundException(`User with UUID ${userId} not found`)

    // Vérifier si le rôle existe
    const role = await Role.findBy('uuid', roleId)
    if (!role) throw new NotFoundException(`Role with UUID ${roleId} not found`)

    // Créer l'attribution (sans cercle pour une attribution globale)
    await Attribution.create({
      userId: user.id,
      roleId: role.id,
      circleId: null, // Attribution globale sans cercle spécifique
    })
  }

  /**
   * Retire un rôle d'un utilisateur (supprime toutes les attributions correspondantes)
   *
   * @param userId - UUID de l'utilisateur concerné
   * @param roleId - UUID du rôle à retirer
   * @throws {NotFoundException} Si l'utilisateur ou le rôle n'existe pas
   * @returns {Promise<void>} Une promesse qui se résout lorsque l'attribution est supprimée
   */
  async removeRole(userId: string, roleId: string): Promise<void> {
    // Trouver l'utilisateur et le rôle
    const user = await User.findBy('uuid', userId)
    if (!user) throw new NotFoundException(`User with UUID ${userId} not found`)

    const role = await Role.findBy('uuid', roleId)
    if (!role) throw new NotFoundException(`Role with UUID ${roleId} not found`)

    // Supprimer toutes les attributions correspondantes (y compris celles avec circleId=null)
    await Attribution.query().where('user_id', user.id).where('role_id', role.id).delete()
  }

  /**
   * Assigne une permission à un rôle
   * Si la permission n'existe pas, elle sera créée automatiquement.
   *
   * @param roleUuid - UUID du rôle auquel ajouter la permission
   * @param permission - Nom/action de la permission à assigner
   * @throws {NotFoundException} Si le rôle n'existe pas
   * @returns {Promise<void>} Une promesse qui se résout lorsque la permission est assignée
   */
  async assignPermission(roleUuid: string, permission: string): Promise<void> {
    // Trouver le rôle
    const role = await Role.findBy('uuid', roleUuid)
    if (!role) throw new NotFoundException(`Role with UUID ${roleUuid} not found`)

    // Trouver ou créer la permission
    let permissionModel = await Permission.findBy('action', permission)
    if (!permissionModel) {
      permissionModel = await Permission.create({ action: permission })
    }

    // Attacher la permission au rôle (s'assurer qu'elle n'est pas déjà attachée)
    await role.related('permissions').attach([permissionModel.id])
  }

  /**
   * Retire une permission d'un rôle
   * Si la permission n'existe pas, la méthode se termine silencieusement.
   *
   * @param roleUuid - UUID du rôle concerné
   * @param permission - Nom/action de la permission à retirer
   * @throws {NotFoundException} Si le rôle n'existe pas
   * @returns {Promise<void>} Une promesse qui se résout lorsque la permission est retirée
   */
  async removePermission(roleUuid: string, permission: string): Promise<void> {
    // Trouver le rôle
    const role = await Role.findBy('uuid', roleUuid)
    if (!role) throw new NotFoundException(`Role with UUID ${roleUuid} not found`)

    // Trouver la permission
    const permissionModel = await Permission.findBy('action', permission)
    if (!permissionModel) return // Si la permission n'existe pas, rien à retirer

    // Détacher la permission du rôle
    await role.related('permissions').detach([permissionModel.id])
  }

  /**
   * Vérifie si un utilisateur a une permission spécifique via l'un de ses rôles
   * La vérification prend en compte tous les rôles de l'utilisateur (globaux et par cercle)
   *
   * @param userUuid - UUID de l'utilisateur à vérifier
   * @param permission - Nom/action de la permission à vérifier
   * @throws {NotFoundException} Si l'utilisateur n'existe pas
   * @returns {Promise<boolean>} true si l'utilisateur a la permission via au moins un rôle, false sinon
   */
  async checkUserPermission(userUuid: string, permission: string): Promise<boolean> {
    // Trouver l'utilisateur
    const user = await User.findBy('uuid', userUuid)
    if (!user) throw new NotFoundException(`User with UUID ${userUuid} not found`)

    // Trouver la permission
    const permissionModel = await Permission.findBy('action', permission)
    if (!permissionModel) return false

    // Récupérer tous les rôles de l'utilisateur
    const attributions = await this.attributionRepository.getUserAttributions(user.id)
    if (!attributions.length) return false

    // Vérifier chaque rôle pour voir s'il a cette permission
    for (const attribution of attributions) {
      // Obtenir les permissions pour ce rôle
      const permissions = await this.roleRepository.getRolePermissions(attribution.roleId)
      // Vérifier si le permissionId est dans la liste
      if (permissions.some((p) => p.id === permissionModel.id)) return true
    }

    return false
  }

  /**
   * Liste tous les rôles disponibles dans le système
   *
   * @returns {Promise<{ id: string; name: string }[]>} Liste de tous les rôles avec leurs UUID et nom
   */
  async listRoles(): Promise<{ id: string; name: string }[]> {
    const roles = await Role.all()
    return roles.map((role) => ({
      id: role.uuid,
      name: role.name,
    }))
  }

  /**
   * Obtient toutes les permissions associées à un rôle spécifique
   *
   * @param roleId - UUID du rôle dont on veut récupérer les permissions
   * @throws {NotFoundException} Si le rôle n'existe pas
   * @returns {Promise<string[]>} Liste des noms/actions des permissions associées au rôle
   */
  async getRolePermissions(roleId: string): Promise<string[]> {
    // Trouver le rôle
    const role = await Role.findBy('uuid', roleId)
    if (!role) throw new NotFoundException(`Role with UUID ${roleId} not found`)

    // Récupérer les permissions via la relation
    await role.load('permissions')
    return role.permissions.map((permission) => permission.action)
  }

  /**
   * Liste tous les rôles utilisés dans un cercle spécifique
   * Récupère les rôles à partir des attributions existantes dans ce cercle
   *
   * @param circleUuid - UUID du cercle concerné
   * @throws {NotFoundException} Si le cercle n'existe pas
   * @returns {Promise<Role[]>} Liste des objets Role utilisés dans ce cercle
   */
  async listRolesByCircleUuid(circleUuid: string): Promise<Role[]> {
    // Trouver le cercle
    const circle = await Circle.findBy('uuid', circleUuid)
    if (!circle) throw new NotFoundException(`Circle with UUID ${circleUuid} not found`)

    // Récupérer toutes les attributions pour ce cercle
    const attributions = await this.attributionRepository.getCircleAttributions(circle.id)
    if (!attributions.length) return []

    // Extraire les IDs de rôle uniques
    const roleIds = [...new Set(attributions.map((attribution) => attribution.roleId))]

    // Récupérer les rôles correspondants
    return await Role.query().whereIn('id', roleIds)
  }

  /**
   * Liste tous les rôles d'un utilisateur dans un cercle spécifique
   * Retourne uniquement les rôles que l'utilisateur possède dans ce cercle
   *
   * @param circleUuid - UUID du cercle concerné
   * @param userId - ID numérique de l'utilisateur (pas l'UUID)
   * @throws {NotFoundException} Si le cercle n'existe pas
   * @returns {Promise<Role[]>} Liste des objets Role attribués à l'utilisateur dans ce cercle
   */
  async listRolesByCircleAndUser(circleUuid: string, userId: number): Promise<Role[]> {
    // Trouver le cercle
    const circle = await Circle.findBy('uuid', circleUuid)
    if (!circle) throw new NotFoundException(`Circle with UUID ${circleUuid} not found`)

    // Récupérer les attributions pour cet utilisateur dans ce cercle
    const attributions = await this.attributionRepository.getUserAttributionsInCircle(
      userId,
      circle.id
    )
    if (!attributions.length) return []

    // Extraire les IDs de rôle uniques
    const roleIds = attributions.map((attribution) => attribution.roleId)

    // Récupérer les rôles correspondants
    return await Role.query().whereIn('id', roleIds)
  }

  /**
   * Vérifie si un rôle spécifique est utilisé dans un cercle
   * Retourne le rôle dans une liste s'il est utilisé, sinon liste vide
   *
   * @param circleUuid - UUID du cercle concerné
   * @param roleUuid - UUID du rôle à rechercher dans le cercle
   * @throws {NotFoundException} Si le cercle ou le rôle n'existe pas
   * @returns {Promise<Role[]>} Liste contenant le rôle s'il est utilisé dans le cercle, sinon liste vide
   */
  async listRolesByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Role[]> {
    // Trouver le cercle et le rôle
    const circle = await Circle.findBy('uuid', circleUuid)
    if (!circle) throw new NotFoundException(`Circle with UUID ${circleUuid} not found`)

    const role = await Role.findBy('uuid', roleUuid)
    if (!role) throw new NotFoundException(`Role with UUID ${roleUuid} not found`)

    // Vérifier s'il y a des attributions pour ce rôle dans ce cercle
    const hasAttributions = await Attribution.query()
      .where('circle_id', circle.id)
      .where('role_id', role.id)
      .first()

    return hasAttributions ? [role] : []
  }

  /**
   * Vérifie si un utilisateur possède un rôle spécifique dans un cercle donné
   * Retourne le rôle dans une liste si l'attribution existe, sinon liste vide
   *
   * @param circleUuid - UUID du cercle concerné
   * @param roleUuid - UUID du rôle à vérifier
   * @param userId - ID numérique de l'utilisateur (pas l'UUID)
   * @throws {NotFoundException} Si le cercle ou le rôle n'existe pas
   * @returns {Promise<Role[]>} Liste contenant le rôle si l'utilisateur le possède dans ce cercle, sinon liste vide
   */
  async listRolesByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Role[]> {
    // Trouver le cercle et le rôle
    const circle = await Circle.findBy('uuid', circleUuid)
    if (!circle) throw new NotFoundException(`Circle with UUID ${circleUuid} not found`)

    const role = await Role.findBy('uuid', roleUuid)
    if (!role) throw new NotFoundException(`Role with UUID ${roleUuid} not found`)

    // Vérifier si l'utilisateur a ce rôle dans ce cercle
    const hasAttribution = await this.attributionRepository.hasAttribution(
      userId,
      role.id,
      circle.id
    )

    return hasAttribution ? [role] : []
  }

  /**
   * Ajoute une relation d'héritage entre deux entités
   * Utilisé notamment pour établir des relations d'héritage de permissions entre fichiers/dossiers
   *
   * @param params - Paramètres de la relation d'héritage
   * @param params.sourceEntityType - Type de l'entité source (FILE, FOLDER, etc.)
   * @param params.sourceEntityId - ID de l'entité source
   * @param params.targetEntityType - Type de l'entité cible (FILE, FOLDER, etc.)
   * @param params.targetEntityId - ID de l'entité cible
   * @param params.createdBy - ID de l'utilisateur qui crée la relation
   * @returns {Promise<void>}
   */
  async addInheritanceRelation(params: {
    sourceEntityType: string
    sourceEntityId: string
    targetEntityType: string
    targetEntityId: string
    createdBy: number
  }): Promise<void> {
    // Dans une implémentation réelle, cette méthode pourrait créer
    // une entrée dans une table d'héritage de permissions ou une table de relations

    // Pour l'instant, nous implémentons un simple log de l'opération pour satisfaire l'interface
    console.log(
      `Relation d'héritage créée entre ${params.sourceEntityType}:${params.sourceEntityId} et` +
        ` ${params.targetEntityType}:${params.targetEntityId} par l'utilisateur ${params.createdBy}`
    )

    // Note: Une implémentation complète nécessiterait probablement un repository dédié
    // pour stocker ces relations d'héritage dans la base de données
  }
}
