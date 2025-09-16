/**
 * @file app/models/supplier.ts
 * @description Modèle Fournisseur.
 */
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Supplier extends BaseModel {
  @column({ isPrimary: true }) declare id: number

  @column() declare code: string
  @column() declare name: string
  @column() declare email: string | null
  @column() declare phone: string | null

  @column() declare addrLine1: string | null
  @column() declare addrLine2: string | null
  @column() declare city: string | null
  @column() declare state: string | null
  @column() declare postal: string | null
  @column() declare country: string | null

  @column() declare isActive: boolean

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime
}
