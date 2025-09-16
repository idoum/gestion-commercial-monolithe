/**
 * @file start/kernel.ts
 * @description Middlewares globaux et nommés (Adonis v6).
 */
import router from '@adonisjs/core/services/router'

/**
 * Middlewares nommés (à utiliser dans routes avec .use(middleware.x))
 * - auth / guest sont fournis par @adonisjs/auth (via configure)
 * - rbac est le tien
 */
export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware'),
  guest: () => import('#middleware/guest_middleware'),
  rbac: () => import('#middleware/rbac'), // ⬅ change en '#middleware/rbac' si ton fichier s'appelle rbac.ts
})

/**
 * Middlewares globaux (appliqués à toutes les requêtes)
 * - La SESSION doit être globale pour ctx.session / flash et le guard 'web'
 * - Shield (CSP/CSRF headers) si tu l'as configuré avant
 */
router.use([
  () => import('#middleware/session_middleware'), // ⬅ ajouté par @adonisjs/session
  () => import('#middleware/shield_middleware'), // ⬅ garde-le si @adonisjs/shield est configuré
  () => import('@adonisjs/session/session_middleware'),
  () => import('@adonisjs/shield/shield_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
  () => import('@adonisjs/static/static_middleware'),
])
