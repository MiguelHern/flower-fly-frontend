import { apiUrl, sinAutorizationJSON } from '@/api/headers.js'
import axios from 'axios'
import { irInicio } from '@/router/Utils.js'

export const usuarioCommand = {
  /*Login*/
  login: async (email, password) => {
    try {
      const JSON = {
        email: email,
        password: password
      }

      const [data, config] = sinAutorizationJSON(JSON)
      const response = await axios.post(apiUrl + '/User/Login', data, config)

      //Se agrega la credencial al localStorage
      localStorage.setItem(import.meta.env.VITE_CREDENCIALES, response.data.accessToken)

      //Te redirecciona al Dashboard
      irInicio()

      //El return solo es para saber si, si se ejecuto correctamente
      return null
    } catch (error) {
      if (error.response.status === 400) {
          return error.response.data.title
      } else if (error.response.status === 404) {
        return 'Nombre de usuario y/o contraseña incorrectos'
      }
    }
  },

}
