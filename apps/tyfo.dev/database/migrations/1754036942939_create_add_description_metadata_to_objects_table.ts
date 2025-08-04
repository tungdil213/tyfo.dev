import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'objects'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description').nullable()
      table.json('metadata').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
      table.dropColumn('metadata')
    })
  }
}
