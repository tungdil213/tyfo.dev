import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'circles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('circle_id').notNullable()
      table.uuid('circle_uuid').notNullable().unique()

      table.string('name').notNullable()
      table.text('description').notNullable()
      table.timestamp('archived_at', { useTz: true }).defaultTo(null).nullable()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
