import axios from 'axios'
import { apiUrl, authorization } from '@/api/headers.js'

export const ordersQueries = {
  getOrders: async (options = {}) => {
    try {
      const defaultOptions = {
        page: 1,
        pageSize: 10
      };

      const queryOptions = { ...defaultOptions, ...options };

      let url = `${apiUrl}/Sales/User?page=${queryOptions.page}`

      if (queryOptions.pageSize) {
        url += `&pageSize=${queryOptions.pageSize}`;
      }

      const response = await axios.get(url, authorization());
      return response.data;
    } catch (error) {
      console.error('Error fetching bouquets:', error);
      throw error;
    }
  },
  getOrderById: async (flowerId) => {
    try {
      const response = await axios.get(`${apiUrl}/Sales/${flowerId}`, authorization());
      return response.data;
    } catch (error) {
      console.error(`Error fetching flower with ID ${flowerId}:`, error);
      throw error;
    }
  },
}
