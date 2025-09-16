import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 100).notNullable().unique()
      table.string('label', 150).notNullable()

      table.dateTime('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
