/**
 * @file database/migrations/xxxx_create_categories_table.ts
 * @description Table des catégories produits.
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 100).notNullable().unique()
      table.string('name', 180).notNullable()
      table.text('description').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.dateTime('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
