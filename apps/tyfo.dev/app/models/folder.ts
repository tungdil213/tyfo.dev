import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'

import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Object from '#models/object'
import Circle from '#models/circle'

export default class Folder extends BaseModel {
  @column({ columnName: 'folder_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'folder_uuid' })
  declare uuid: string

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

  @hasMany(() => Object)
  declare objects: HasMany<typeof Object>

  @belongsTo(() => Circle)
  declare circle: BelongsTo<typeof Circle>
}
