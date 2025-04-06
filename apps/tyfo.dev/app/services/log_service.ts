import { inject } from '@adonisjs/core'
import Log from '#models/log'
import { CreateLogParams } from '#services/contracts/log_service_contract'
import LogRepository from '#repositories/log_repository'
import User from '#models/user'
import { generateUuid } from '#utils/uuid_helper'

@inject()
export class LogService {
  constructor(private logRepository: LogRepository) {}

  /**
   * Crée une nouvelle entrée dans le journal
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
   */
  public async getUserLogs(userId: number) {
    return await this.logRepository.findByUser(userId)
  }

  /**
   * Récupère les entrées de journal concernant un objet spécifique
   */
  public async getObjectLogs(objectType: string, objectId: string) {
    return await this.logRepository.findByPrimaryObject(objectType, objectId)
  }

  /**
   * Crée une entrée de journal pour une connexion utilisateur
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
}
