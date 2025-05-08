import { apiUrl, authorization, authorizationJSON } from '@/api/headers.js'
import axios from 'axios'

export const cartCommand = {
  add: async (bouquetId, quantity) => {
    try {
      const JSON = {
        bouquetId: bouquetId,
        quantity: quantity,
      }

      const [data, config] = authorizationJSON(JSON)
      await axios.post(apiUrl + '/ShoppingCar/Item', data, config)

      return null
    } catch (error) {
      if (error.response.status === 400) {
        return error.response.data.title
      } else if (error.response.status === 404) {
        return 'Corrige perro'
      }
    }
  },
  edit: async (itemId, quantity) => {
    console.log()
    try {
      const JSON = { quantity }
      const [data, config] = authorizationJSON(JSON)
      await axios.patch(`${apiUrl}/ShoppingCar/Item/${itemId}`, data, config)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },
  delete: async (cartId) => {
    try {
      const config = authorization()

      await axios.delete(`${apiUrl}/ShoppingCar/Item/${cartId}`, config)

      return null
    } catch (error) {
      if (error.response?.status === 400) {
        return error.response.data.title
      } else if (error.response?.status === 404) {
        return 'Corrige perro'
      } else {
        return 'Error inesperado'
      }
    }
  },
  addBulked: async (items) => {
    try {
      const JSON = { add: items }
      const [data, config] = authorizationJSON(JSON)
      await axios.patch(apiUrl + '/ShoppingCar', data, config)
      return null
    } catch (error) {
      if (error.response?.status === 400) {
        return error.response.data.title
      } else if (error.response?.status === 404) {
        return 'Corrige perro'
      } else {
        return 'Error inesperado'
      }
    }
  },

  payCart: async () => {
    const [data, config] = authorization()
    await axios.post(`${apiUrl}/ShoppingCar/pay`, data, config)
  }
}
