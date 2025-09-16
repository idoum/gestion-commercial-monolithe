/**
 * @file database/seeders/rbac_seeder.ts
 * @description Crée/Met à jour les rôles et permissions de base + un compte admin.
 * À exécuter après les migrations : `node ace db:seed`
 */

import User from '#models/user'
import Role from '#models/role'
import Permission from '#models/permission'
import { hashPassword } from '../utils/hash_password.js'

export default class RbacSeeder {
  /**
   * @function run
   * @description Alimente les permissions (CRUD métier), rattache tout au rôle admin,
   * et crée/MAJ un compte administrateur.
   */
  public async run() {
    // --- 1) Permissions ---
    // NB: on ne fait pas (encore) de granularité "read/manage" sur chaque ressource côté routes,
    //     mais on prépare déjà les permissions nécessaires pour évoluer facilement.
    const permissionsSeed = [
      // Users / Administration
      { code: 'user.manage', label: 'Gérer utilisateurs' },

      // Produits / Catalogue
      { code: 'product.read', label: 'Lire produits' },
      { code: 'product.manage', label: 'Gérer produits' },

      { code: 'category.manage', label: 'Gérer catégories' },
      { code: 'unit.manage', label: 'Gérer unités' },
      { code: 'tax.manage', label: 'Gérer taxes' },

      // Tiers
      { code: 'customer.read', label: 'Lire clients' },
      { code: 'customer.manage', label: 'Gérer clients' },
      { code: 'supplier.read', label: 'Lire fournisseurs' },
      { code: 'supplier.manage', label: 'Gérer fournisseurs' },

      // Rapports
      { code: 'report.view', label: 'Voir rapports' },
    ] as const

    for (const p of permissionsSeed) {
      await Permission.updateOrCreate({ code: p.code }, p)
    }

    // --- 2) Rôle Admin (toutes permissions) ---
    const adminRole = await Role.updateOrCreate(
      { code: 'admin' },
      { code: 'admin', label: 'Administrateur' }
    )

    const allPerms = await Permission.all()
    await adminRole.related('permissions').sync(allPerms.map((p) => p.id))

    // --- 3) Compte administrateur ---
    const adminEmail = 'admin@example.com'
    const adminPassword = 'Admin123!' // à changer dès la première connexion

    const adminUser = await User.updateOrCreate(
      { email: adminEmail },
      {
        email: adminEmail,
        fullName: 'Administrateur',
        password: await hashPassword(adminPassword),
        isActive: true,
      }
    )
    await adminUser.related('roles').sync([adminRole.id])

    console.log('RBAC seed terminé ✅')
    console.log('Admin :', adminEmail, ' / ', adminPassword)
    console.log('Permissions :', permissionsSeed.map((p) => p.code).join(', '))
  }
}
