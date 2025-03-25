import Notification from '#models/notification'
import { NotificationRepositoryContract } from '#contracts/notification_repository_contract'

export default class NotificationRepository implements NotificationRepositoryContract {
  public async create(data: Partial<Notification>): Promise<Notification> {
    return await Notification.create(data)
  }

  public async findByTemplate(template: string): Promise<Notification | null> {
    return await Notification.findBy('template', template)
  }

  public async listByUser(userId: number): Promise<Notification[]> {
    return await Notification.query().where('user_id', userId).orderBy('execution_time', 'desc')
  }

  public async findUnreadByUser(userId: number): Promise<Notification[]> {
    return await Notification.query().where('user_id', userId).where('is_notified', false)
  }

  public async markAsRead(notificationId: number): Promise<void> {
    await Notification.query().where('id', notificationId).update({ is_notified: true })
  }

  public async delete(notificationId: number): Promise<void> {
    await Notification.query().where('id', notificationId).delete()
  }
}
