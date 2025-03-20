import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Role extends BaseModel {
  @column({ columnName: 'role_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'role_uuid' })
  declare uuid: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: String

  @column()
  declare description: String
}
