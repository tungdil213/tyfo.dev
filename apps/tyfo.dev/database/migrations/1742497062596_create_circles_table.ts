import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'circles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('circle_id')
      table.uuid('circle_uuid').notNullable().unique()

      table.string('name').notNullable()
      table.text('description').notNullable()
      table.integer('owner_id').unsigned().notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
