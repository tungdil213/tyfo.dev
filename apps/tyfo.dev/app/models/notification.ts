import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { generateUuid } from '#utils/uuid_helper'

export default class Notification extends BaseModel {
  @column({ columnName: 'notification_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'notification_uuid' })
  declare uuid: string

  @column.dateTime()
  declare executionTime: DateTime

  @column.dateTime()
  declare confirmationTime: DateTime | null

  @column()
  declare isNotified: boolean

  @column()
  declare userId: number

  @column()
  declare template: string

  @column()
  declare vector: string

  @column()
  declare content: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => User)
  declare recipient: BelongsTo<typeof User>

  @beforeCreate()
  static generateUuid(notification: Notification) {
    notification.uuid = generateUuid()
  }
}
