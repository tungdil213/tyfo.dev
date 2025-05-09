import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Circle from './circle.js'
import Folder from './folder.js'
import Log from './log.js'
import Notification from './notification.js'
import ObjectModel from './object.js'
import Role from './role.js'
import Attribution from './attribution.js'
import { generateUuid } from '#utils/uuid_helper'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ columnName: 'user_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'user_uuid' })
  declare uuid: string

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime({ columnName: 'deleted_at', serializeAs: null })
  declare deletedAt: DateTime | null

  // Relations
  @hasMany(() => Circle)
  declare circles: HasMany<typeof Circle>

  @hasMany(() => Folder)
  declare folders: HasMany<typeof Folder>

  @manyToMany(() => Role, {
    pivotTable: 'attributions',
    pivotColumns: ['circle_id', 'attribution_uuid'],
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'role_id',
    pivotTimestamps: true,
  })
  declare roles: ManyToMany<typeof Role>

  @hasMany(() => Log)
  declare logs: HasMany<typeof Log>

  @hasMany(() => Notification)
  declare notifications: HasMany<typeof Notification>

  @hasMany(() => ObjectModel)
  declare objects: HasMany<typeof ObjectModel>

  @beforeCreate()
  static generateUuid(user: User) {
    user.uuid = generateUuid()
  }
}
