/**
 * @file app/middleware/ensure_auth_middleware.ts
 * @description Redirige vers /login si l'utilisateur n'est pas authentifié
 *              au lieu de répondre 401.
 */
import type { HttpContext } from '@adonisjs/core/http'

export default class EnsureAuthMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    try {
      await auth.authenticate()
      return next()
    } catch {
      return response.redirect('/login')
    }
  }
}
