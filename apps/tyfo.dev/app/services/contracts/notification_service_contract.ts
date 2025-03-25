import { DateTime } from 'luxon'

export interface NotificationServiceContract {
  /**
   * Envoie immédiatement une notification à un utilisateur.
   */
  sendNotification(userId: number, template: string, data: Record<string, any>): Promise<void>

  /**
   * Programme une notification pour une date future.
   */
  scheduleNotification(
    userId: number,
    template: string,
    data: Record<string, any>,
    date: DateTime
  ): Promise<void>

  /**
   * Récupère les notifications d'un utilisateur.
   */
  getNotifications(userId: number): Promise<{ id: number; message: string; read: boolean }[]>

  /**
   * Récupère les notifications non lues d'un utilisateur.
   */
  getUnreadNotifications(userId: number): Promise<{ id: number; message: string }[]>

  /**
   * Marque une notification comme lue.
   */
  markAsRead(notificationId: number): Promise<void>

  /**
   * Supprime une notification (soft delete).
   */
  deleteNotification(notificationId: number): Promise<void>
}
