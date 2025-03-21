import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('notification_id')
      table.uuid('notification_uuid').notNullable().unique()

      table.timestamp('execution_time', { useTz: true }).notNullable()
      table.timestamp('confirmation_time', { useTz: true }).nullable()
      table.boolean('is_notified').defaultTo(false)
      table
        .integer('recipient_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('template').notNullable()
      table.json('vector').nullable()
      table.json('content').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
