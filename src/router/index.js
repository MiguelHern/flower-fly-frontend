import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import InventoryView from '@/features/admin/views/InventoryView.vue'
import SettingsView from '@/features/admin/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      // meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'auth',
      component: AuthLayout,
      // meta: { verifyToken: false }
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
          path: '/cart',
          name: 'cart',
          component: () => import('../features/cart/views/CartView.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: '/inventory',
          name: 'inventory',
          component: InventoryView,
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingsView,
        }
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

// router.beforeEach(async (to, from, next) => {
//   //AfterEach --NOTA--
//   /* Verificamos si existe el id para el interrogatorio */
//   if (to.meta.idExistente) {
//
//     const response = await pacientesQueries.getDatosPaciente(to.params.id)
//
//     if (response == null) {
//       return next({ name: 'NotFound' })
//     } else if(response.verificado === true){
//       return next({ name: 'NotFound' })
//     }else{
//       return next()
//     }
//   }
//
//   /* Verifica que el token sea autentico */
//   if (to.meta.verifyToken) {
//     if (localStorage.getItem(import.meta.env.VITE_CREDENCIALES) === '') {
//       localStorage.removeItem(import.meta.env.VITE_CREDENCIALES)
//       localStorage.removeItem(import.meta.env.VITE_USUARIO)
//       next('/')
//     }
//
//     const response = await usuariosQueries.verifyUser(localStorage.getItem(import.meta.env.VITE_CREDENCIALES))
//     if (response.verify === false) {
//       localStorage.removeItem(import.meta.env.VITE_CREDENCIALES)
//       localStorage.removeItem(import.meta.env.VITE_USUARIO)
//       next('/')
//     } else {
//       next()
//     }
//   }
//
//   /*
//    * Redireccion a la ruta "/"
//    * Si tengo acceso no me permitira ver el login
//    * */
//   if (to.name === 'login') {
//     if (localStorage.getItem(import.meta.env.VITE_CREDENCIALES) != null) {
//       next({ name: 'Dashboard' })
//     }
//   }
//
//   /* Cambia el titulo dependiendo de la pagina */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   } else {
//     document.title = 'Fisiolabs' // Título por defecto
//   }
//
//
//   return next()
// })
