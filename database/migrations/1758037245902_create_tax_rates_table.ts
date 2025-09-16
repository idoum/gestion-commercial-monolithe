/**
 * @file database/migrations/xxxx_create_tax_rates_table.ts
 * @description Taux de taxe (TVA).
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tax_rates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 50).notNullable().unique() // ex: "TVA5"
      table.string('label', 100).notNullable() // ex: "TVA 5%"
      table.decimal('rate', 5, 2).notNullable().defaultTo(0) // ex: 5.00 (%)
      table.string('region', 100).nullable()

      table.dateTime('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
