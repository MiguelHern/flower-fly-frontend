import { jwtDecode } from 'jwt-decode'
import { apiUrl, withoutAuthorizationJSON } from '@/api/headers.js'
import axios from 'axios'
import { logInAdmin, logInUser } from '@/router/Utils.js'

export const usuarioCommand = {
  login: async (email, password) => {
    try {
      const JSON = {
        email: email,
        password: password
      }

      const [data, config] = withoutAuthorizationJSON(JSON)
      const response = await axios.post(apiUrl + '/User/Login', data, config)

      const token = response.data.accessToken
      localStorage.setItem(import.meta.env.VITE_CREDENCIALES, token)

      const decoded = jwtDecode(token)
      const rol = decoded.role

      if (rol === 'ADMIN') {
        logInAdmin()
      } else {
        logInUser()
      }
      localStorage.setItem(import.meta.env.VITE_ROL, rol)

      return null
    } catch (error) {
      if (error.response.status === 400) {
        return error.response.data.title
      } else if (error.response.status === 404) {
        return 'Nombre de usuario y/o contraseña incorrectos'
      }
    }
  }
}
