import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Folder from '#models/folder'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ObjectModel extends BaseModel {
  static table = 'objects'

  @column({ columnName: 'object_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'object_uuid' })
  declare uuid: string

  @column({ columnName: 'user_id' })
  declare userId: number

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

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @belongsTo(() => Folder)
  declare folder: BelongsTo<typeof Folder>
}
