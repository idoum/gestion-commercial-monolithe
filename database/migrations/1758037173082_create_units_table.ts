/**
 * @file database/migrations/xxxx_create_units_table.ts
 * @description Unités de mesure (PCS, KG, L, etc.)
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'units'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 16).notNullable().unique() // ex: "PCS"
      table.string('label', 100).notNullable() // ex: "Pièce"

      table.dateTime('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
