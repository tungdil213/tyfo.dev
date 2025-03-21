import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Log extends BaseModel {
  @column({ columnName: 'log_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'log_uuid' })
  declare uuid: string

  @column()
  declare userId: number

  @column()
  declare action: string

  @column()
  declare primaryType: string

  @column()
  declare primaryObject: string

  @column()
  declare secondaryType: string | null

  @column()
  declare secondaryObject: string | null

  @column()
  declare message: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
