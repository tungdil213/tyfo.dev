import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attributions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('attribution_id')
      table.uuid('attribution_uuid').notNullable().unique()

      table.integer('user_id').unsigned().notNullable()
      table.integer('role_id').unsigned().notNullable()
      table.integer('circle_id').unsigned().notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
