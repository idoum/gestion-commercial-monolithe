/**
 * @file database/migrations/xxxx_create_suppliers_table.ts
 * @description Tiers - Fournisseurs.
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'suppliers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 100).notNullable().unique()
      table.string('name', 255).notNullable()
      table.string('email', 255).nullable()
      table.string('phone', 50).nullable()

      table.string('addr_line1', 255).nullable()
      table.string('addr_line2', 255).nullable()
      table.string('city', 100).nullable()
      table.string('state', 100).nullable()
      table.string('postal', 20).nullable()
      table.string('country', 100).nullable()

      table.boolean('is_active').notNullable().defaultTo(true)

      table.dateTime('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
