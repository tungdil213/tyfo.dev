import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import NotificationService from '#services/notification_service'
import { NotificationRepositoryContract } from '#repositories/contracts/notification_repository_contract'

// Mock du repository de notifications pour les tests
class TestNotificationRepository implements NotificationRepositoryContract {
  private notifications: Array<{
    id: number
    userId: number
    template: string
    content: string
    isNotified: boolean
    executionTime: DateTime
  }> = []

  private nextId: number = 1

  async create(data: {
    userId: number
    template: string
    content: string
    isNotified: boolean
    executionTime: DateTime
  }) {
    const notification = {
      id: this.nextId++,
      ...data,
    }
    this.notifications.push(notification)
    return notification
  }

  async listByUser(userId: number) {
    return this.notifications.filter((n) => n.userId === userId)
  }

  async findUnreadByUser(userId: number) {
    return this.notifications.filter((n) => n.userId === userId && !n.isNotified)
  }

  async markAsRead(notificationId: number) {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.isNotified = true
    }
  }

  async delete(notificationId: number) {
    const index = this.notifications.findIndex((n) => n.id === notificationId)
    if (index !== -1) {
      this.notifications.splice(index, 1)
    }
  }
}

test.group('NotificationService', (group) => {
  let service: NotificationService
  let notificationRepository: TestNotificationRepository

  group.each.setup(() => {
    notificationRepository = new TestNotificationRepository()
    service = new NotificationService(notificationRepository)
  })

  test('sendNotification should create a notification with current datetime', async ({
    assert,
  }) => {
    const userId = 1
    const template = 'test_template'
    const data = { message: 'Test notification' }

    // Avant envoi
    const beforeNotifications = await service.getNotifications(userId)
    assert.lengthOf(beforeNotifications, 0)

    // Envoi de la notification
    await service.sendNotification(userId, template, data)

    // Après envoi
    const afterNotifications = await service.getNotifications(userId)
    assert.lengthOf(afterNotifications, 1)
    assert.equal(afterNotifications[0].message, 'Test notification')
    assert.isFalse(afterNotifications[0].read)
  })

  test('scheduleNotification should create a notification with future datetime', async ({
    assert,
  }) => {
    const userId = 2
    const template = 'scheduled_template'
    const data = { message: 'Scheduled notification' }
    const futureDate = DateTime.now().plus({ days: 1 })

    // Avant envoi
    const beforeNotifications = await service.getNotifications(userId)
    assert.lengthOf(beforeNotifications, 0)

    // Planification de la notification
    await service.scheduleNotification(userId, template, data, futureDate)

    // Après envoi
    const afterNotifications = await service.getNotifications(userId)
    assert.lengthOf(afterNotifications, 1)
    assert.equal(afterNotifications[0].message, 'Scheduled notification')
    assert.isFalse(afterNotifications[0].read)
  })

  test('getNotifications should return all notifications for a user', async ({ assert }) => {
    const userId1 = 3
    const userId2 = 4

    // Créer des notifications pour différents utilisateurs
    await service.sendNotification(userId1, 'template1', { message: 'Notification for user 1' })
    await service.sendNotification(userId1, 'template2', { message: 'Another for user 1' })
    await service.sendNotification(userId2, 'template3', { message: 'Notification for user 2' })

    // Vérifier que chaque utilisateur ne voit que ses notifications
    const user1Notifications = await service.getNotifications(userId1)
    assert.lengthOf(user1Notifications, 2)

    const user2Notifications = await service.getNotifications(userId2)
    assert.lengthOf(user2Notifications, 1)
    assert.equal(user2Notifications[0].message, 'Notification for user 2')
  })

  test('getUnreadNotifications should only return unread notifications', async ({ assert }) => {
    const userId = 5

    // Créer plusieurs notifications
    await service.sendNotification(userId, 'template1', { message: 'First notification' })
    await service.sendNotification(userId, 'template2', { message: 'Second notification' })
    await service.sendNotification(userId, 'template3', { message: 'Third notification' })

    // Marquer une notification comme lue
    const notifications = await service.getNotifications(userId)
    await service.markAsRead(notifications[0].id)

    // Vérifier que seules les notifications non lues sont retournées
    const unreadNotifications = await service.getUnreadNotifications(userId)
    assert.lengthOf(unreadNotifications, 2)
  })

  test('markAsRead should mark a notification as read', async ({ assert }) => {
    const userId = 6

    // Créer une notification
    await service.sendNotification(userId, 'template', { message: 'Test notification' })

    // Vérifier qu'elle n'est pas lue
    let notifications = await service.getNotifications(userId)
    assert.lengthOf(notifications, 1)
    assert.isFalse(notifications[0].read)

    // Marquer comme lue
    await service.markAsRead(notifications[0].id)

    // Vérifier qu'elle est maintenant lue
    notifications = await service.getNotifications(userId)
    assert.lengthOf(notifications, 1)
    assert.isTrue(notifications[0].read)

    // Les notifications non lues ne devraient plus la contenir
    const unreadNotifications = await service.getUnreadNotifications(userId)
    assert.lengthOf(unreadNotifications, 0)
  })

  test('deleteNotification should remove a notification', async ({ assert }) => {
    const userId = 7

    // Créer une notification
    await service.sendNotification(userId, 'template', { message: 'To be deleted' })

    // Vérifier qu'elle existe
    let notifications = await service.getNotifications(userId)
    assert.lengthOf(notifications, 1)

    // Supprimer la notification
    await service.deleteNotification(notifications[0].id)

    // Vérifier qu'elle a été supprimée
    notifications = await service.getNotifications(userId)
    assert.lengthOf(notifications, 0)
  })
})
