import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Log extends BaseModel {
  @column({ columnName: 'log_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'log_uuid' })
  declare uuid: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare action: string

  @column({ columnName: 'primary_type' })
  declare primaryType: string

  @column({ columnName: 'primary_object' })
  declare primaryObject: string

  @column({ columnName: 'secondary_type' })
  declare secondaryType: string

  @column({ columnName: 'secondary_object' })
  declare secondaryObject: string

  @column()
  declare message: string
}
