/**
 * @file app/validators/login_validator.ts
 * @description Validation des champs de connexion.
 */
import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
    remember: vine.boolean().optional(),
  }),
)
