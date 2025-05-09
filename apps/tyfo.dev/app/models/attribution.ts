// models/attribution.ts
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Circle from '#models/circle'
import Role from '#models/role'
import User from '#models/user'
import { generateUuid } from '#utils/uuid_helper'

export default class Attribution extends BaseModel {
  @column({ columnName: 'attribution_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'attribution_uuid' })
  declare uuid: string

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'role_id' })
  declare roleId: number

  @column({ columnName: 'circle_id' })
  declare circleId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Relations
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Circle)
  declare circle: BelongsTo<typeof Circle>

  // Hook pour générer automatiquement un UUID lors de la création avec le décorateur
  @beforeCreate()
  static generateUuid(attribution: Attribution) {
    attribution.uuid = generateUuid()
  }
}
