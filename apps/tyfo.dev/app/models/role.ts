import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Permission from '#models/permission'
import User from '#models/user'
import { generateUuid } from '#utils/uuid_helper'

export default class Role extends BaseModel {
  @column({ columnName: 'role_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'role_uuid' })
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'permission_id',
  })
  declare permissions: ManyToMany<typeof Permission>

  @beforeCreate()
  static generateUuid(role: Role) {
    role.uuid = generateUuid()
  }
}
