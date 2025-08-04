import { inject } from '@adonisjs/core'
import { NotificationRepositoryContract } from '#repositories/contracts/notification_repository_contract'
import { NotificationServiceContract } from '#services/contracts/notification_service_contract'
import { DateTime } from 'luxon'

/**
 * Service responsable de la gestion des notifications dans le système.
 *
 * Ce service gère :
 * - L'envoi de notifications immédiates aux utilisateurs
 * - La planification de notifications pour un envoi ultérieur
 * - La récupération des notifications (toutes ou non lues)
 * - Le marquage des notifications comme lues
 * - La suppression des notifications
 */

@inject()
export default class NotificationService implements NotificationServiceContract {
  /**
   * Initialise le service de notification
   *
   * @param notificationRepository - Référentiel d'accès aux données des notifications
   */
  constructor(private notificationRepository: NotificationRepositoryContract) {}

  /**
   * Envoie une notification immédiate à un utilisateur
   *
   * @param userId - Identifiant de l'utilisateur destinataire
   * @param template - Identifiant ou nom du modèle de notification à utiliser
   * @param data - Données à intégrer dans la notification (sera sérialisé en JSON)
   * @returns Une promesse résolue lorsque la notification a été créée
   */
  public async sendNotification(
    userId: number,
    template: string,
    data: Record<string, any>
  ): Promise<void> {
    await this.notificationRepository.create({
      userId,
      template,
      content: JSON.stringify(data),
      isNotified: false,
      executionTime: DateTime.now(),
    })
  }

  /**
   * Planifie l'envoi d'une notification pour une date ultérieure
   *
   * @param userId - Identifiant de l'utilisateur destinataire
   * @param template - Identifiant ou nom du modèle de notification à utiliser
   * @param data - Données à intégrer dans la notification (sera sérialisé en JSON)
   * @param date - Date et heure d'exécution prévue de la notification
   * @returns Une promesse résolue lorsque la notification planifiée a été créée
   */
  public async scheduleNotification(
    userId: number,
    template: string,
    data: Record<string, any>,
    date: DateTime
  ): Promise<void> {
    await this.notificationRepository.create({
      userId,
      template,
      content: JSON.stringify(data),
      isNotified: false,
      executionTime: date,
    })
  }

  /**
   * Récupère toutes les notifications d'un utilisateur (lues et non lues)
   *
   * @param userId - Identifiant de l'utilisateur
   * @returns Liste des notifications avec leur état de lecture
   */
  public async getNotifications(
    userId: number
  ): Promise<{ id: number; message: string; read: boolean }[]> {
    const notifications = await this.notificationRepository.findByUser(userId)

    return notifications.map((n) => ({
      id: n.id,
      message: JSON.parse(n.content).message || '',
      read: n.isNotified,
    }))
  }

  /**
   * Récupère uniquement les notifications non lues d'un utilisateur
   *
   * @param userId - Identifiant de l'utilisateur
   * @returns Liste des notifications non lues
   */
  public async getUnreadNotifications(userId: number): Promise<{ id: number; message: string }[]> {
    const unreadNotifications = await this.notificationRepository.findUnreadByUser(userId)

    return unreadNotifications.map((n: any) => ({
      id: n.id,
      message: JSON.parse(n.content).message || '',
    }))
  }

  /**
   * Marque une notification comme lue
   *
   * @param notificationId - Identifiant de la notification à marquer comme lue
   * @returns Une promesse résolue lorsque la notification a été mise à jour
   */
  public async markAsRead(notificationId: number): Promise<void> {
    await this.notificationRepository.markAsConfirmed(notificationId)
  }

  /**
   * Supprime définitivement une notification
   *
   * @param notificationId - Identifiant de la notification à supprimer
   * @returns Une promesse résolue lorsque la notification a été supprimée
   * @throws Error - Si la notification n'existe pas ou ne peut pas être supprimée
   */
  public async deleteNotification(notificationId: number): Promise<void> {
    await this.notificationRepository.delete(notificationId.toString())
  }
}
