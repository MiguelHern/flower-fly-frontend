import { apiUrl, authorizationJSON } from '@/api/headers.js'
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
}
