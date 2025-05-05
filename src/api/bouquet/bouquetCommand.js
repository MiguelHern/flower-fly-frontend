import { apiUrl, autorizationFormData } from '@/api/headers.js'
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

      const [data, config] = autorizationFormData(formData)

      const response = await axios.post(apiUrl + '/Bouquet', data, config)

      return response.data
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.title
      } else {
        return 'Error al crear el bouquet'
      }
    }
  }
}
