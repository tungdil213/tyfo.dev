import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attributions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('attribution_id').notNullable()
      table.uuid('attribution_uuid').notNullable().unique()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('CASCADE')

      table
        .integer('circle_id')
        .unsigned()
        .notNullable()
        .references('circle_id')
        .inTable('circles')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
