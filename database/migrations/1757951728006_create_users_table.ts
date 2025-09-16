/**
 * @file database/migrations/xxxx_create_users_table.ts
 * @description Table des utilisateurs applicatifs (MySQL strict-friendly).
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email', 255).notNullable().unique()
      table.string('password').notNullable()
      table.string('full_name', 255).nullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      // ✅ IMPORTANT: défaut à NOW() pour MySQL strict
      table.dateTime('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
