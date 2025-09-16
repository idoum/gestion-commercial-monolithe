/**
 * @file app/controllers/auth_controller.ts
 * @description Connexion/déconnexion via sessions.
 */
import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import User from '#models/user'
import bcrypt from 'bcryptjs'

export default class AuthController {
  /**
   * @function showLogin
   * @description Affiche le formulaire de connexion.
   */
  public async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  /**
   * @function login
   * @description Tente d'authentifier l'utilisateur, crée la session si ok.
   */
  public async login(ctx: HttpContext) {
    const { request, response, auth, session } = ctx
    const payload = await request.validateUsing(loginValidator)

    const user = await User.findBy('email', payload.email)
    if (!user || !user.isActive) {
      session.flash('error', 'Identifiants invalides')
      return response.redirect('/login')
    }

    const ok = await bcrypt.compare(payload.password, user.password)
    if (!ok) {
      session.flash('error', 'Identifiants invalides')
      return response.redirect('/login')
    }

    await auth.use('web').login(user)
    return response.redirect('/')
  }

  /**
   * @function logout
   * @description Déconnecte l'utilisateur courant.
   */
  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
