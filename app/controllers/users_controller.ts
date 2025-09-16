/**
 * @file app/controllers/users_controller.ts
 * @description Liste des utilisateurs (lecture seule pour S1).
 */
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  /**
   * @function index
   * @description Liste paginée des utilisateurs (lecture).
   */
  public async index({ view, request }: HttpContext) {
    const page = Number(request.input('page', 1))
    const limit = 10
    const users = await User.query().orderBy('id', 'asc').paginate(page, limit)
    users.baseUrl('/users')
    return view.render('users/index', { users })
  }
}
