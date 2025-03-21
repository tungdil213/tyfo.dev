import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Folder from '#models/folder'
import User from '#models/user'
import Attribution from './attribution.js'

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
  declare ownerId: number

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
}
