/**
 * @file app/models/setting.ts
 * @description Paramétrage général (clé/valeur).
 */
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  declare key: string

  @column()
  declare value: string | null
}
