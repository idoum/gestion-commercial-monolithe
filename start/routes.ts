/**
 * @file start/routes.ts
 */
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const UsersController = () => import('#controllers/users_controller')

// Auth
router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout'])

// start/routes.ts (en bas)
router.get('/hello', ({ view }) => view.render('hello'))

// Protégé
router
  .group(() => {
    router.get('/', [DashboardController, 'index'])
    router.get('/users', [UsersController, 'index']).use(middleware.rbac(['user.manage']))
  })
  .use(middleware.auth()) // si tu as l'auth nommée
