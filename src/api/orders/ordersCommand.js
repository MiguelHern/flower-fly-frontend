import { apiUrl, authorization, authorizationFormData, authorizationJSON } from '@/api/headers.js'
import axios from 'axios'

export const ordersCommand = {
  edit: async (itemId) => {
    console.log()
    try {
      const [data, config] = authorizationJSON(JSON)
      await axios.patch(`${apiUrl}/Sales/Finalizar/${itemId}`, data, config)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  pay: async () => {
    try {
      const json = {}

      const [data, config] = authorizationJSON(json)
      await axios.post(`${apiUrl}/ShoppingCar/Pay`, data, config)
      return "Creado con exito"
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.title
      } else {
        return 'Error al pagar'
      }
    }
  },
}
