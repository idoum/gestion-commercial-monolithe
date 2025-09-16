/**
 * @file database/seeders/rbac_seeder.ts
 * @description Crée les rôles/permissions de base et un utilisateur admin.
 * - A exécuter après les migrations: `node ace db:seed`
 */
import User from '#models/user'
import Role from '#models/role'
import Permission from '#models/permission'
//import { randomBytes } from 'crypto'
import { hashPassword } from '../utils/hash_password.js' // helper local (voir plus bas)

export default class RbacSeeder {
  public async run() {
    // Permissions de base (extrait)
    const perms = [
      { code: 'product.read', label: 'Lire produits' },
      { code: 'product.manage', label: 'Gérer produits' },
      { code: 'user.manage', label: 'Gérer utilisateurs' },
      { code: 'report.view', label: 'Voir rapports' },
    ]

    for (const p of perms) {
      await Permission.updateOrCreate({ code: p.code }, p)
    }

    // Rôle admin avec toutes les permissions
    const admin = await Role.updateOrCreate(
      { code: 'admin' },
      { code: 'admin', label: 'Administrateur' }
    )
    const allPerms = await Permission.all()
    await admin.related('permissions').sync(allPerms.map((p) => p.id))

    // Compte administrateur
    const email = 'admin@example.com'
    const passwordPlain = 'Admin123!' // à changer ensuite
    const user = await User.updateOrCreate(
      { email },
      {
        email,
        fullName: 'Administrateur',
        password: await hashPassword(passwordPlain),
        isActive: true,
      }
    )
    await user.related('roles').sync([admin.id])

    console.log('RBAC seed done. Admin:', email, 'pwd:', passwordPlain)
  }
}
