import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import { DateTime } from 'luxon'
import { generateUuid } from '#utils/uuid_helper'

export default class Permission extends BaseModel {
  @column({ columnName: 'permission_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'permission_uuid' })
  declare uuid: string

  @column()
  declare action: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @manyToMany(() => Role, {
    pivotTable: 'role_permissions',
    pivotForeignKey: 'permission_id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>

  @beforeCreate()
  static generateUuid(permission: Permission) {
    permission.uuid = generateUuid()
  }
}
