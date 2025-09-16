/**
 * @file database/migrations/xxxx_number_sequences.ts
 * @description Table des séquences de numérotation.
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'number_sequences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('code', 50).primary()
      table.string('prefix', 20).notNullable()
      table.integer('padding').notNullable().defaultTo(6)
      table.integer('last_number').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
