import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Permission extends BaseModel {
  @column({ columnName: 'permission_id', isPrimary: true })
  declare id: number

  @column()
  declare role: string

  @column()
  declare action: string
}