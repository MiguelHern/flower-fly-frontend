import axios from 'axios'
import { apiUrl, autorization } from '@/api/headers.js'

export const userQueries = {
  verifyUser: async (token) => {
    try{
      const response = await axios.get(apiUrl + "/Cuenta/verifyUser/" + token, autorization())

      return response.data
    } catch (error){
      console.log(error)
    }
  },
}
