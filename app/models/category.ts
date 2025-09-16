/**
 * @file app/models/category.ts
 * @description Modèle Catégorie.
 */
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Product from './product.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true }) declare id: number

  @column() declare code: string
  @column() declare name: string
  @column() declare description: string | null
  @column() declare isActive: boolean

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime
}
