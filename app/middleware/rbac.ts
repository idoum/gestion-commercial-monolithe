/**
 * @file app/middleware/rbac_middleware.ts
 * @description Middleware RBAC: contrôle d'accès par permission.
 */
import type { HttpContext } from '@adonisjs/core/http'

export default class RbacMiddleware {
  public async handle(ctx: HttpContext, next: () => Promise<void>, perms: string[] = []) {
    const user = ctx.auth?.user
    if (!user) {
      ctx.response.redirect('/login')
      return
    }

    if (perms.length === 0) {
      await next()
      return
    }

    await user.load('roles', (r) => r.preload('permissions'))
    const userPerms = new Set<string>()
    user.roles.forEach((role) => role.permissions.forEach((p) => userPerms.add(p.code)))

    const allowed = perms.every((p) => userPerms.has(p))
    if (!allowed) {
      return ctx.response.forbidden('Permission insuffisante')
    }

    await next()
  }
}
