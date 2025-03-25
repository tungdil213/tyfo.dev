import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'folders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('folder_id').notNullable()
      table.uuid('folder_uuid').notNullable().unique()

      table
        .integer('circle_id')
        .unsigned()
        .notNullable()
        .references('circle_id')
        .inTable('circles')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('parent_id')
        .unsigned()
        .nullable()
        .references('folder_id')
        .inTable('folders')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.text('description').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
