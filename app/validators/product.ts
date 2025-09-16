/**
 * @file app/validators/product.ts
 * @description Schéma de validation pour Produit (création / mise à jour).
 */
import vine from '@vinejs/vine'

export const productValidator = vine.compile(
  vine.object({
    sku: vine.string().trim().minLength(1).maxLength(100),
    name: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().optional().nullable(),

    categoryId: vine.number().withoutDecimals().positive(),
    unitId: vine.number().withoutDecimals().positive(),
    taxRateId: vine.number().withoutDecimals().positive(),

    priceHt: vine.number().min(0),
    stockQty: vine.number().min(0),
    imageUrl: vine.string().url().optional().nullable(),
    isActive: vine.boolean(),
  })
)
