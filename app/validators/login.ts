/**
 * @file app/validators/login.ts
 * @description Validation des identifiants de connexion (Vine).
 */
import vine from '@vinejs/vine'

/**
 * @function loginValidator
 * @description Valide l'email et le mot de passe. Pas de regex exotique -> pas d'erreur "pattern".
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(), // email valide
    password: vine.string().minLength(6), // min 6 caractères
    // "remember" est optionnel (checkbox)
    remember: vine.boolean().optional(),
  })
)
