import Notification from '#models/notification'
import { NotificationRepositoryContract } from '#repositories/contracts/notification_repository_contract'
import Repository from './base/repository.js'

export default class NotificationRepository
  extends Repository<Notification>
  implements NotificationRepositoryContract
{
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
