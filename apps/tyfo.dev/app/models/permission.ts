import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'

export default class Permission extends BaseModel {
  @column({ columnName: 'permission_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'permission_uuid' })
  declare uuid: string

  @column()
  declare action: string

  @column()
  declare roleId: number

  // Relations
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
