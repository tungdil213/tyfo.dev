import Notification from '#models/notification'

export abstract class NotificationRepositoryContract {
  abstract create(data: Partial<Notification>): Promise<Notification>
  abstract findByTemplate(template: string): Promise<Notification | null>
  abstract listByUser(userId: number): Promise<Notification[]>
  abstract findUnreadByUser(userId: number): Promise<Notification[]>
  abstract markAsRead(notificationId: number): Promise<void>
  abstract delete(notificationId: number): Promise<void>
}
