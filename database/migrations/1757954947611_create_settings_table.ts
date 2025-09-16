/**
 * @file database/migrations/xxxx_settings.ts
 * @description Table clé/valeur pour paramètres globaux.
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('key', 150).primary()
      table.text('value').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
