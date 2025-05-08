import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import InventoryView from '@/features/admin/views/InventoryView.vue'
import SettingsView from '@/features/admin/views/SettingsView.vue'
import { userQueries } from '@/api/user/userQueries.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'auth',
      component: AuthLayout,
      meta: { verifyToken: false },
      redirect: { name: 'login' },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../features/auth/views/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../features/auth/views/RegisterView.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'user',
      component: UserLayout,
      meta: { requiresRole: 'USER' },
      redirect: { name: 'products' },
      children: [
        {
          path: '/products',
          name: 'products',
          component: () => import('../features/products/views/HomeView.vue'),
        },
        {
          path: '/products/:categorySlug',
          name: 'category-products',
          component: () => import('../features/products/views/CategoryProductsView.vue'),
          props: true,
        },
        {
          path: '/products/:categorySlug/:productSlug',
          name: 'product-detail',
          component: () => import('../features/products/views/ProductDetailView.vue'),
          props: true,
        },
        {
          path: '/custom-bouquets',
          name: 'custom-bouquets',
          component: () => import('../features/bouquets/views/CustomBouquetView.vue'),
        },
        {
          path: '/bouquets',
          name: 'bouquets',
          component: () => import('../features/bouquets/views/BouquetsHome.vue'),
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('../features/cart/views/CartView.vue'),
        },
        {
          path: '/orders-user',
          name: 'orders-user',
          component: () => import('../features/sales/views/OrdersView.vue'),
        },
        {
          path: '/orders/:id',
          name: 'order-detail',
          component: () => import('../features/sales/views/OrderDetailView.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/',
      name: 'admin',
      component: AdminLayout,
      redirect: { name: 'inventory' },
      meta: { requiresRole: 'ADMIN' },
      children: [
        {
          path: '/inventory',
          name: 'inventory',
          component: InventoryView,
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('../features/admin/views/OrdersView.vue'),
        },
        {
          path: '/orders/:id',
          name: 'orderDetail',
          component: () => import('../features/admin/views/OrderDetailsView.vue'),
          props: true,
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingsView,
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem(import.meta.env.VITE_CREDENCIALES)
  const rol = localStorage.getItem(import.meta.env.VITE_ROL)

  // Redirige si necesita token y no hay
  if (to.meta.verifyToken) {
    if (!token) {
      localStorage.clear()
      return next({ name: 'login' })
    }

    const response = await userQueries.verifyUser(token)
    if (!response.verify) {
      localStorage.clear()
      return next({ name: 'login' })
    }
  }

  // Bloquea rutas de admin si no es admin
  if (to.meta.requiresRole && to.meta.requiresRole !== rol) {
    return next({ name: 'not-found' }) // o a otra página de error
  }

  // Evita que usuario autenticado entre a login
  if (to.name === 'login' && token) {
    return next({ name: 'products' })
  }

  // Cambiar el título
  document.title = to.meta.title || 'Flower Fly'

  return next()
})
