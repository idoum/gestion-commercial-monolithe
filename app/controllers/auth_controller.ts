/**
 * @file app/controllers/auth_controller.ts
 * @description Connexion/déconnexion via sessions (guard "web").
 */
import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import User from '#models/user'
import { errors } from '@adonisjs/auth'

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
   * @description Valide le formulaire, vérifie les identifiants et crée la session.
   */
  public async login({ request, response, session, auth }: HttpContext) {
    try {
      const { email, password, remember } = await request.validateUsing(loginValidator)

      try {
        // ✅ v6 : verifyCredentials fourni par le mixin AuthFinder (sur le modèle User)
        const user = await User.verifyCredentials(email, password)

        // Création de la session; "remember" facultatif (voir config plus bas)
        await auth.use('web').login(user, remember)

        return response.redirect('/')
      } catch (err) {
        // Mauvais identifiants
        if (err instanceof errors.E_INVALID_CREDENTIALS) {
          session.flash('error', 'Identifiants invalides')
          return response.redirect('/login')
        }
        // Autre erreur
        console.error('[auth.login] error:', err)
        session.flash('error', 'Une erreur est survenue')
        return response.redirect('/login')
      }
    } catch (error: any) {
      // Erreurs de validation
      session.flash('error', 'Veuillez corriger les erreurs du formulaire')
      if (error?.messages) {
        session.flashErrors(error.messages)
      }
      return response.redirect('/login')
    }
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
