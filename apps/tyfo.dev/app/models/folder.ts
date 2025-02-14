import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Folder extends BaseModel {
  @column({ columnName: 'folder_id', isPrimary: true })
  declare id: number

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ columnName: 'circle_id' })
  declare circleId: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'parent_id' })
  declare parentId: number | null

  @column()
  declare name: string

  @column()
  declare description: string | null
}