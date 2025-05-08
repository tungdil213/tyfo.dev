import Notification from '#models/notification'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'
import { DateTime } from 'luxon'

export abstract class NotificationRepositoryContract extends BaseRepositoryContract<Notification> {
  /**
   * Trouve les notifications non envoyées qui doivent être envoyées
   * @param currentTime L'heure actuelle pour comparer avec le executionTime
   * @returns Liste de notifications à envoyer
   */
  abstract findDueNotifications(currentTime: DateTime): Promise<Notification[]>

  /**
   * Trouve toutes les notifications d'un utilisateur
   * @param userId Identifiant de l'utilisateur
   * @returns Liste des notifications de l'utilisateur
   */
  abstract findByUser(userId: number): Promise<Notification[]>

  /**
   * Trouve toutes les notifications non lues d'un utilisateur
   * @param userId Identifiant de l'utilisateur
   * @returns Liste des notifications non lues
   */
  abstract findUnreadByUser(userId: number): Promise<Notification[]>

  /**
   * Marque une notification comme envoyée
   * @param id Identifiant de la notification
   * @returns La notification mise à jour
   */
  abstract markAsNotified(id: number): Promise<Notification>

  /**
   * Marque une notification comme confirmée/lue
   * @param id Identifiant de la notification
   * @returns La notification mise à jour
   */
  abstract markAsConfirmed(id: number): Promise<Notification>

  /**
   * Recherche des notifications par vecteur (email, sms, push)
   * @param vector Le vecteur de communication
   * @returns Liste des notifications correspondantes
   */
  abstract findByVector(vector: string): Promise<Notification[]>

  /**
   * Recherche des notifications par modèle
   * @param template Le modèle de notification
   * @returns Liste des notifications correspondantes
   */
  abstract findByTemplate(template: string): Promise<Notification[]>
}
