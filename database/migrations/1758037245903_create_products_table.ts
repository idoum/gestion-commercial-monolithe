/**
 * @file database/migrations/xxxx_create_products_table.ts
 * @description Produits (SKU, prix HT, taxes, stock…)
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('sku', 100).notNullable().unique()
      table.string('name', 255).notNullable()
      table.text('description').nullable()

      // FK -> categories
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('RESTRICT')

      // FK -> units
      table
        .integer('unit_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('units')
        .onDelete('RESTRICT')

      // FK -> tax_rates
      table
        .integer('tax_rate_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tax_rates')
        .onDelete('RESTRICT')

      table.decimal('price_ht', 12, 2).notNullable().defaultTo(0)
      table.decimal('stock_qty', 14, 3).notNullable().defaultTo(0)
      table.string('image_url', 1024).nullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.dateTime('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
