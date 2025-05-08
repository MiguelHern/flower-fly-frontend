import { apiUrl, authorization, authorizationFormData } from '@/api/headers.js'
import axios from 'axios'

export const bouquetCommand = {
  createBouquet: async (name, price, stock, isCustomizable, flowers, imageFile) => {
    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('price', price)
      formData.append('stock', stock)
      formData.append('isCustomizable', isCustomizable ? '1' : '0')

      flowers.forEach((f, index) => {
        formData.append(`Flowers[${index}].FlowerId`, f.id)
        formData.append(`Flowers[${index}].Quantity`, f.quantity)
      })

      formData.append('image', imageFile)

      const [data, config] = authorizationFormData(formData)

      const response = await axios.post(apiUrl + '/Bouquet', data, config)
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.title
      } else {
        return 'Error al crear el bouquet'
      }
    }
  },
  createFlower: async (name, price,imageFile,type,color,season, stock) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('image', imageFile)
      formData.append('type', type)
      formData.append('color', color)
      formData.append('season', season)
      formData.append('stock', stock)
      const [data, config] = authorizationFormData(formData)
      const response = await axios.post(apiUrl + '/Flower', data, config)
      return response.data
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.title
      }
    }
  },
  editFlower: async (name, price,imageFile,type,color,season, stock) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('image', imageFile)
      formData.append('type', type)
      formData.append('color', color)
      formData.append('season', season)
      formData.append('stock', stock)
      const [data, config] = authorizationFormData(formData)
      const response = await axios.patch(apiUrl + '/Flower', data, config)
      return response.data
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.title
      }
    }
  },

  deleteBouquets: async (flowerId) => {
    try {
      const config = authorization()

      await axios.delete(`${apiUrl}/Bouquet/${flowerId}`, config)

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
}
