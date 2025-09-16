/**
 * @file app/controllers/products_controller.ts
 * @description CRUD Produits (liste, création, édition, suppression).
 */
import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Category from '#models/category'
import Unit from '#models/unit'
import TaxRate from '#models/tax_rate'
import { productValidator } from '#validators/product'

export default class ProductsController {
  /**
   * @function index
   * @description Liste paginée + recherche.
   */
  public async index({ request, view }: HttpContext) {
    const page = Number(request.input('page', 1))
    const perPage = 10
    const q = String(request.input('q', '')).trim()

    const query = Product.query()
      .preload('category')
      .preload('unit')
      .preload('taxRate')
      .orderBy('id', 'desc')

    if (q) {
      query.where((builder) => {
        builder.where('name', 'like', `%${q}%`).orWhere('sku', 'like', `%${q}%`)
      })
    }

    const products = await query.paginate(page, perPage)
    products.baseUrl('/admin/products') // pour générer les URLs de pagination

    return view.render('admin/products/index', { products, q })
  }

  /**
   * @function create
   * @description Formulaire de création.
   */
  public async create({ view }: HttpContext) {
    const [categories, units, taxRates] = await Promise.all([
      Category.all(),
      Unit.all(),
      TaxRate.all(),
    ])
    return view.render('admin/products/create', { categories, units, taxRates })
  }

  /**
   * @function store
   * @description Enregistre un produit.
   */
  public async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(productValidator)
      await Product.create(payload)
      session.flash('success', 'Produit créé avec succès')
      return response.redirect('/admin/products')
    } catch (error) {
      session.flash('error', 'Veuillez corriger les erreurs du formulaire')
      session.flashErrors(error.messages || {})
      return response.redirect().back()
    }
  }

  /**
   * @function edit
   * @description Formulaire d’édition.
   */
  public async edit({ params, view, response }: HttpContext) {
    const product = await Product.find(params.id)
    if (!product) return response.notFound('Produit introuvable')

    const [categories, units, taxRates] = await Promise.all([
      Category.all(),
      Unit.all(),
      TaxRate.all(),
    ])

    return view.render('admin/products/edit', {
      product,
      categories,
      units,
      taxRates,
    })
  }

  /**
   * @function update
   * @description Met à jour un produit.
   */
  public async update({ params, request, response, session }: HttpContext) {
    const product = await Product.find(params.id)
    if (!product) return response.notFound('Produit introuvable')

    try {
      const payload = await request.validateUsing(productValidator)
      product.merge(payload)
      await product.save()
      session.flash('success', 'Produit mis à jour')
      return response.redirect('/admin/products')
    } catch (error) {
      session.flash('error', 'Veuillez corriger les erreurs du formulaire')
      session.flashErrors(error.messages || {})
      return response.redirect().back()
    }
  }

  /**
   * @function destroy
   * @description Supprime un produit.
   */
  public async destroy({ params, response, session }: HttpContext) {
    const product = await Product.find(params.id)
    if (!product) return response.notFound('Produit introuvable')

    await product.delete()
    session.flash('success', 'Produit supprimé')
    return response.redirect('/admin/products')
  }
}
