import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Folder from '#models/folder'

export default class Circle extends BaseModel {
  @column({ columnName: 'circle_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'circle_uuid' })
  declare uuid: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: String

  @column()
  declare description: String

  @column({ columnName: 'owner_id' })
  declare ownerId: number

  @hasMany(() => Folder)
  declare folders: HasMany<typeof Folder>
}
