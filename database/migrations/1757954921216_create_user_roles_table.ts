/**
 * @file database/migrations/xxxx_user_roles.ts
 * @description Pivot user_roles (n:m).
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().notNullable()
      table.integer('role_id').unsigned().notNullable()

      table.primary(['user_id', 'role_id'])
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.foreign('role_id').references('roles.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
