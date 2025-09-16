/**
 * @file app/models/tax_rate.ts
 * @description Modèle Taux de taxe.
 */
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Product from './product.js'

export default class TaxRate extends BaseModel {
  @column({ isPrimary: true }) declare id: number

  @column() declare code: string
  @column() declare label: string
  @column() declare rate: number
  @column() declare region: string | null

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime
}
