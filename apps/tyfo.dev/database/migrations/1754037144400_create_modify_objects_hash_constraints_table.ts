import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'objects'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Modifier la colonne hash pour la rendre nullable
      table.string('hash').nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remettre la contrainte NOT NULL sur hash
      table.string('hash').notNullable().alter()
    })
  }
}
