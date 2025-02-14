import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Object extends BaseModel {
  @column({ columnName: 'object_id', isPrimary: true })
  declare id: number

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ columnName: 'owner_id' })
  declare ownerId: number

  @column({ columnName: 'folder_id' })
  declare folderId: number

  @column()
  declare name: string

  @column({ columnName: 'mime_type' })
  declare mimeType: string

  @column()
  declare revision: number

  @column()
  declare hash: string

  @column()
  declare location: string

}