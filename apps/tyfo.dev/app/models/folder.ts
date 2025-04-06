import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'

import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ObjectModel from '#models/object'
import Circle from '#models/circle'
import User from '#models/user'
import { generateUuid } from '#utils/uuid_helper'

export default class Folder extends BaseModel {
  @column({ columnName: 'folder_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'folder_uuid' })
  declare uuid: string

  @column()
  declare circleId: number

  @column()
  declare userId: number

  @column()
  declare parentId: number | null

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => Circle)
  declare circle: BelongsTo<typeof Circle>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => ObjectModel)
  declare objects: HasMany<typeof ObjectModel>

  @beforeCreate()
  static generateUuid(folder: Folder) {
    folder.uuid = generateUuid()
  }
}
