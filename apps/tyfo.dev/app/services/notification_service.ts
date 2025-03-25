import { inject } from '@adonisjs/core'
import { NotificationRepositoryContract } from '#contracts/notification_repository_contract'
import { NotificationServiceContract } from '#contracts/notification_service_contract'
import { DateTime } from 'luxon'

@inject()
export default class NotificationService implements NotificationServiceContract {
  constructor(private notificationRepository: NotificationRepositoryContract) {}

  public async sendNotification(
    userId: number,
    template: string,
    data: Record<string, any>
  ): Promise<void> {
    await this.notificationRepository.create({
      userId,
      template,
      content: JSON.stringify(data),
      isNotified: false, // Non lu par défaut
      executionTime: DateTime.now(),
    })
  }

  public async scheduleNotification(
    userId: number,
    template: string,
    data: Record<string, any>,
    date: Date
  ): Promise<void> {
    await this.notificationRepository.create({
      userId,
      template,
      content: JSON.stringify(data),
      isNotified: false,
      executionTime: DateTime.now(),
    })
  }

  public async getNotifications(
    userId: number
  ): Promise<{ id: number; message: string; read: boolean }[]> {
    const notifications = await this.notificationRepository.listByUser(userId)

    return notifications.map((n) => ({
      id: n.id,
      message: JSON.parse(n.content).message || '',
      read: n.isNotified,
    }))
  }

  public async getUnreadNotifications(userId: number): Promise<{ id: number; message: string }[]> {
    const unreadNotifications = await this.notificationRepository.findUnreadByUser(userId)

    return unreadNotifications.map((n) => ({
      id: n.id,
      message: JSON.parse(n.content).message || '',
    }))
  }

  public async markAsRead(notificationId: number): Promise<void> {
    await this.notificationRepository.markAsRead(notificationId)
  }

  public async deleteNotification(notificationId: number): Promise<void> {
    await this.notificationRepository.delete(notificationId)
  }
}
