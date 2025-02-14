import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Notification extends BaseModel {
  @column({ columnName: 'notification_id', isPrimary: true })
  declare id: number

  @column.dateTime({ columnName: 'created_at',autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({columnName: 'execution_time'})
  declare executionTime: DateTime

  @column({columnName: 'confirmation_time'})
  declare confirmationTime: DateTime

  @column({columnName: 'is_notified'})
  declare isNotified: boolean

  @column({columnName: 'recipient_id'})
  declare recipientId: number

  @column()
  declare template: String

  @column()
  declare vector: String

  @column()
  declare content: String
}