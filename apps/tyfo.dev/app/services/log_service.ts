import { inject } from '@adonisjs/core'
import { CreateLogParams } from '#services/contracts/log_service_contract'
import LogRepository from '#repositories/log_repository'
import User from '#models/user'
import { generateUuid } from '#utils/uuid_helper'

/**
 * Service responsable de la journalisation des activités du système
 *
 * Ce service fournit des méthodes pour enregistrer diverses actions utilisateur et événements système.
 * Il permet notamment de tracer :
 * - Les connexions et déconnexions utilisateurs
 * - Les actions CRUD sur les objets du système
 * - Les actions relationnelles entre objets
 */
@inject()
export default class LogService {
  /**
   * Crée une instance du service de journalisation
   * @param logRepository Le repository d'accès aux données de logs
   */
  constructor(private logRepository: LogRepository) {}

  /**
   * Crée une nouvelle entrée dans le journal
   * @param params Les paramètres de création du log
   * @returns L'entrée de journal créée
   */
  public async createLog(params: CreateLogParams) {
    return await this.logRepository.create({
      uuid: generateUuid(),
      userId: params.userId,
      action: params.action,
      primaryType: params.primaryType,
      primaryObject: params.primaryObject,
      secondaryType: params.secondaryType || null,
      secondaryObject: params.secondaryObject || null,
      message: params.message,
    })
  }

  /**
   * Crée une entrée de journal pour une action simple sur un objet
   * @param user L'utilisateur qui a effectué l'action
   * @param action Le type d'action effectuée (ex: OBJECT_CREATE, OBJECT_UPDATE)
   * @param objectType Le type de l'objet concerné (ex: FILE, FOLDER, USER)
   * @param objectId L'identifiant unique de l'objet
   * @param message Le message descriptif de l'action
   * @returns L'entrée de journal créée
   */
  public async logAction(
    user: User,
    action: string,
    objectType: string,
    objectId: string,
    message: string
  ) {
    return await this.createLog({
      userId: user.id,
      action,
      primaryType: objectType,
      primaryObject: objectId,
      message,
    })
  }

  /**
   * Crée une entrée de journal pour une action impliquant deux objets (par exemple un transfert)
   * @param user L'utilisateur qui a effectué l'action
   * @param action Le type d'action effectuée (ex: TRANSFER, LINK)
   * @param sourceType Le type de l'objet source
   * @param sourceId L'identifiant unique de l'objet source
   * @param targetType Le type de l'objet cible
   * @param targetId L'identifiant unique de l'objet cible
   * @param message Le message descriptif de l'action
   * @returns L'entrée de journal créée
   */
  public async logRelationalAction(
    user: User,
    action: string,
    sourceType: string,
    sourceId: string,
    targetType: string,
    targetId: string,
    message: string
  ) {
    return await this.createLog({
      userId: user.id,
      action,
      primaryType: sourceType,
      primaryObject: sourceId,
      secondaryType: targetType,
      secondaryObject: targetId,
      message,
    })
  }

  /**
   * Récupère les entrées de journal pour un utilisateur
   * @param userId L'identifiant de l'utilisateur
   * @returns Les entrées de journal associées à l'utilisateur
   */
  public async getUserLogs(userId: number) {
    return await this.logRepository.findByUser(userId)
  }

  /**
   * Récupère les entrées de journal concernant un objet spécifique
   * @param objectType Le type de l'objet concerné (ex: FILE, FOLDER, USER)
   * @param objectId L'identifiant unique de l'objet
   * @returns Les entrées de journal associées à l'objet
   */
  public async getObjectLogs(objectType: string, objectId: string) {
    return await this.logRepository.findByPrimaryObject(objectType, objectId)
  }

  /**
   * Crée une entrée de journal pour une connexion utilisateur
   * @param user L'utilisateur qui s'est connecté
   * @returns L'entrée de journal créée
   */
  public async logUserLogin(user: User) {
    return await this.logAction(
      user,
      'USER_LOGIN',
      'USER',
      user.uuid,
      `L'utilisateur ${user.fullName || user.email} s'est connecté`
    )
  }

  /**
   * Crée une entrée de journal pour une déconnexion utilisateur
   * @param user L'utilisateur qui s'est déconnecté
   * @returns L'entrée de journal créée
   */
  public async logUserLogout(user: User) {
    return await this.logAction(
      user,
      'USER_LOGOUT',
      'USER',
      user.uuid,
      `L'utilisateur ${user.fullName || user.email} s'est déconnecté`
    )
  }

  /**
   * Crée une entrée de journal pour la création d'un objet
   * @param user L'utilisateur qui a créé l'objet
   * @param objectType Le type de l'objet créé (ex: FILE, FOLDER, USER)
   * @param objectId L'identifiant unique de l'objet créé
   * @param objectName Le nom ou titre de l'objet créé
   * @returns L'entrée de journal créée
   */
  public async logObjectCreation(
    user: User,
    objectType: string,
    objectId: string,
    objectName: string
  ) {
    return await this.logAction(
      user,
      'OBJECT_CREATE',
      objectType,
      objectId,
      `L'utilisateur ${user.fullName || user.email} a créé ${objectType.toLowerCase()} "${objectName}"`
    )
  }

  /**
   * Crée une entrée de journal pour la modification d'un objet
   * @param user L'utilisateur qui a modifié l'objet
   * @param objectType Le type de l'objet modifié (ex: FILE, FOLDER, USER)
   * @param objectId L'identifiant unique de l'objet modifié
   * @param objectName Le nom ou titre de l'objet modifié
   * @returns L'entrée de journal créée
   */
  public async logObjectModification(
    user: User,
    objectType: string,
    objectId: string,
    objectName: string
  ) {
    return await this.logAction(
      user,
      'OBJECT_UPDATE',
      objectType,
      objectId,
      `L'utilisateur ${user.fullName || user.email} a modifié ${objectType.toLowerCase()} "${objectName}"`
    )
  }

  /**
   * Crée une entrée de journal pour la suppression d'un objet
   * @param user L'utilisateur qui a supprimé l'objet
   * @param objectType Le type de l'objet supprimé (ex: FILE, FOLDER, USER)
   * @param objectId L'identifiant unique de l'objet supprimé
   * @param objectName Le nom ou titre de l'objet supprimé
   * @returns L'entrée de journal créée
   */
  public async logObjectDeletion(
    user: User,
    objectType: string,
    objectId: string,
    objectName: string
  ) {
    return await this.logAction(
      user,
      'OBJECT_DELETE',
      objectType,
      objectId,
      `L'utilisateur ${user.fullName || user.email} a supprimé ${objectType.toLowerCase()} "${objectName}"`
    )
  }

  /**
   * Crée une entrée de journal pour la création d'une version de document
   * @param user L'utilisateur qui a créé la version
   * @param documentId L'identifiant unique du document
   * @param documentName Le nom ou titre du document
   * @param versionNumber Le numéro de version créée
   * @returns L'entrée de journal créée
   */
  public async logDocumentVersionCreation(
    user: User,
    documentId: string,
    documentName: string,
    versionNumber: number
  ) {
    return await this.logAction(
      user,
      'DOCUMENT_VERSION_CREATE',
      'DOCUMENT',
      documentId,
      `Une nouvelle version (v${versionNumber}) du document "${documentName}" a été créée`
    )
  }
}
