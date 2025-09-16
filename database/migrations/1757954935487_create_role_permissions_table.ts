/**
 * @file database/migrations/xxxx_role_permissions.ts
 * @description Pivot role_permissions (n:m).
 */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().notNullable()
      table.integer('permission_id').unsigned().notNullable()

      table.primary(['role_id', 'permission_id'])
      table.foreign('role_id').references('roles.id').onDelete('CASCADE')
      table.foreign('permission_id').references('permissions.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
