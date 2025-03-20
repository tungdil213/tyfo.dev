import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'objects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('object_id')
      table.uuid('object_uuid').notNullable().unique()

      table.integer('owner_id').unsigned().notNullable()
      table.integer('folder_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.string('mime_type').notNullable()
      table.integer('revision').unsigned().notNullable().defaultTo(1)
      table.string('hash').notNullable()
      table.string('location').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
