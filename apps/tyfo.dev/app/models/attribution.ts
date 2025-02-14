import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Attribution extends BaseModel {
  @column({ columnName: 'attribution_id', isPrimary: true })
  declare id: number

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'role_id' })
  declare roleId: number

  @column({ columnName: 'circle_id' })
  declare circleId: number
}