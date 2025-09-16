/**
 * @file app/models/product.ts
 * @description Modèle Produit.
 */
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Category from './category.js'
import Unit from './unit.js'
import TaxRate from './tax_rate.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true }) declare id: number

  @column() declare sku: string
  @column() declare name: string
  @column() declare description: string | null

  @column({ columnName: 'category_id' }) declare categoryId: number
  @column({ columnName: 'unit_id' }) declare unitId: number
  @column({ columnName: 'tax_rate_id' }) declare taxRateId: number

  @belongsTo(() => Category) declare category: BelongsTo<typeof Category>
  @belongsTo(() => Unit) declare unit: BelongsTo<typeof Unit>
  @belongsTo(() => TaxRate) declare taxRate: BelongsTo<typeof TaxRate>

  @column() declare priceHt: number
  @column() declare stockQty: number
  @column() declare imageUrl: string | null
  @column() declare isActive: boolean

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime
}
