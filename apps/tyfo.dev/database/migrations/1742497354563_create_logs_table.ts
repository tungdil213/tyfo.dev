import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('log_id')
      table.uuid('log_uuid').notNullable().unique()

      table.integer('user_id').unsigned().notNullable()
      table.string('action').notNullable()
      table.string('primary_type').notNullable()
      table.string('primary_object').notNullable()
      table.string('secondary_type').notNullable()
      table.string('secondary_object').notNullable()
      table.text('message').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
