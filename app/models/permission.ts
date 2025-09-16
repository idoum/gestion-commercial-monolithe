/**
 * @file app/models/permission.ts
 * @description Modèle Permission (droits atomiques).
 */
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations' // ✅ bon chemin
import { DateTime } from 'luxon'
import Role from './role.js'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string // ex: "product.read", "invoice.issue"

  @column()
  declare label: string // ex: "Lire produits", "Émettre facture"

  @manyToMany(() => Role, {
    pivotTable: 'role_permissions',
  })
  declare roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
