import router from '@/router/index.js'

export const logOut = () => {
  router.push({ name: 'login' })
  localStorage.removeItem(import.meta.env.VITE_CREDENCIALES)
  localStorage.removeItem(import.meta.env.VITE_USUARIO)
  localStorage.removeItem(import.meta.env.VITE_ROL)
}

export const logInUser = () => {
  router.push({ name: 'products' })
}

export const logInAdmin = () => {
  router.push({ name: 'inventory' })
}
