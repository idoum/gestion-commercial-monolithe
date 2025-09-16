/**
 * @file app/models/number_sequence.ts
 * @description Séquences de numérotation (préfixe + compteur par document).
 */
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class NumberSequence extends BaseModel {
  @column({ isPrimary: true })
  declare code: string // ex: "QUOTE", "ORDER", "INVOICE"

  @column()
  declare prefix: string // ex: "Q-", "SO-", "FA-"

  @column()
  declare padding: number // ex: 6 => Q-000123

  @column()
  declare lastNumber: number // incrémenté lors de l'émission
}
