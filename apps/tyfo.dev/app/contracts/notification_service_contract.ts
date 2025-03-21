export interface NotificationServiceContract {
  sendNotification(userId: string, template: string, data: any): Promise<void>
  scheduleNotification(userId: string, template: string, data: any, date: Date): Promise<void>
  getNotifications(userId: string): Promise<{ id: string; message: string; read: boolean }[]>
  markAsRead(notificationId: string): Promise<void>
}
