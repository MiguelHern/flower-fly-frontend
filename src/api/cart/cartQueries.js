import axios from 'axios'
import { apiUrl, authorization } from '@/api/headers.js'

export const cartQueries = {
  getCart: async () => {
    try{
      const response = await axios.get(apiUrl + "/ShoppingCar/", authorization())
      return response.data
    } catch (error){
      console.log(error)
    }
  },
}
