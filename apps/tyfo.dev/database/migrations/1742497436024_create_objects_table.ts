import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'objects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('object_id').notNullable()
      table.uuid('object_uuid').notNullable().unique()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('folder_id')
        .unsigned()
        .notNullable()
        .references('folder_id')
        .inTable('folders')
        .onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('mime_type').notNullable()
      table.integer('revision').unsigned().notNullable().defaultTo(1)
      table.string('hash').notNullable()
      table.string('location').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
