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
      table.integer('recipient_id').unsigned().notNullable()
      table.string('template').notNullable()
      // Pour le vecteur, vous pouvez utiliser un type JSON ou un tableau de chaînes de caractères selon vos besoins
      table.json('vector').nullable()
      // Pour le contenu, on stocke un JSON
      table.json('content').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
