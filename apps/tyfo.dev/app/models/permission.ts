import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Permission extends BaseModel {
  @column({ columnName: 'permission_id', isPrimary: true })
  declare id: number

  @column({ columnName: 'permission_uuid' })
  declare uuid: string

  @column()
  declare role: string

  @column()
  declare action: string
}
