/**
 * @file start/routes.ts
 * @description Définition des routes (auth, dashboard, users) + Catalogue & Tiers (admin) avec RBAC, Adonis v6.
 */
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

/* ========= Controllers (imports dynamiques) ========= */
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const UsersController = () => import('#controllers/users_controller')

const CategoriesController = () => import('#controllers/categories_controller')
const UnitsController = () => import('#controllers/units_controller')
const TaxRatesController = () => import('#controllers/tax_rates_controller')
const ProductsController = () => import('#controllers/products_controller')
const CustomersController = () => import('#controllers/customers_controller')
const SuppliersController = () => import('#controllers/suppliers_controller')

/* ========= Auth ========= */
router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth()) // déconnexion protégée

/* (Route de test Edge) */
router.get('/hello', ({ view }) => view.render('hello'))

/* ========= Zone protégée (après connexion) ========= */
router
  .group(() => {
    router.get('/', [DashboardController, 'index'])

    // Users list (existant) — protégé par permission user.manage
    router.get('/users', [UsersController, 'index']).use(middleware.rbac(['user.manage']))
  })
  .use(middleware.auth())

/* ========= Admin: Catalogue & Tiers =========
   Tout le bloc /admin est protégé par authentification.
   Chaque ressource a son RBAC propre.
*/
router
  .group(() => {
    /* -------- Catalogue -------- */

    // Catégories (RBAC: category.manage)
    router
      .group(() => {
        router.resource('categories', CategoriesController)
      })
      .use(middleware.rbac(['category.manage']))

    // Unités (RBAC: unit.manage)
    router
      .group(() => {
        router.resource('units', UnitsController)
      })
      .use(middleware.rbac(['unit.manage']))

    // Taux de taxe (RBAC: tax.manage)
    router
      .group(() => {
        router.resource('tax-rates', TaxRatesController)
      })
      .use(middleware.rbac(['tax.manage']))

    // Produits (RBAC: product.manage)
    router
      .group(() => {
        router.resource('products', ProductsController)
      })
      .use(middleware.rbac(['product.manage']))

    /* -------- Tiers -------- */

    // Clients (RBAC: customer.manage)
    router
      .group(() => {
        router.resource('customers', CustomersController)
      })
      .use(middleware.rbac(['customer.manage']))

    // Fournisseurs (RBAC: supplier.manage)
    router
      .group(() => {
        router.resource('suppliers', SuppliersController)
      })
      .use(middleware.rbac(['supplier.manage']))
  })
  .prefix('/admin')
  .use(middleware.auth())
