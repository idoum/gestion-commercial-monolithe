/**
 * @file app/controllers/dashboard_controller.ts
 * @description Page d'accueil authentifiée (KPI à venir).
 */
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  /**
   * @function index
   * @description Affiche un tableau de bord minimal (placeholder).
   */
  public async index({ view }: HttpContext) {
    const kpis = { ca: 0, marge: 0, clients: 0 }
    return view.render('dashboard/index', { kpis })
  }
}
