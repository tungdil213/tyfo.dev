import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Folder from '#models/folder'
import User from '#models/user'
import Attribution from './attribution.js'
import { generateUuid } from '#utils/uuid_helper'

export default class Circle extends BaseModel {
  @column({ columnName: 'circle_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'circle_uuid' })
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare userId: number

  @column.dateTime({ columnName: 'archived_at' })
  declare archivedAt: DateTime | null

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @hasMany(() => Folder)
  declare folders: HasMany<typeof Folder>

  @hasMany(() => Attribution)
  declare attributions: HasMany<typeof Attribution>

  @beforeCreate()
  static generateUuid(circle: Circle) {
    circle.uuid = generateUuid()
  }
}
