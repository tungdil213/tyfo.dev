import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'folders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('folder_id')
      table.uuid('folder_uuid').notNullable().unique()

      table.integer('circle_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.integer('parent_id').unsigned().nullable()
      table.string('name').notNullable()
      table.text('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
