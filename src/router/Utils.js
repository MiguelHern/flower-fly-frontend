import router from '@/router/index.js'

export const logOut = () => {
  localStorage.clear()
  router.push('/')
}


export const logInUser = () => {
  router.push({ name: 'products' })
}

export const logInAdmin = () => {
  router.push({ name: 'inventory' })
}
