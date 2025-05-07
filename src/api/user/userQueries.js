import axios from 'axios'
import { apiUrl, authorization } from '@/api/headers.js'

export const userQueries = {
  verifyUser: async (token) => {
    try{
      const response = await axios.get(apiUrl + "/Cuenta/verifyUser/" + token, authorization())
      return response.data
    } catch (error){
      console.log(error)
    }
  },
}
