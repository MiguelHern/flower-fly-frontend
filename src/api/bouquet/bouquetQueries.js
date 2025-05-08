import axios from 'axios'
import { apiUrl, authorization } from '@/api/headers.js'

export const bouquetQueries = {
  getFlowers: async (options = {}) => {
    try {
      const defaultOptions = {
        page: 1,
        pageSize: 10,
        colors: []
      };

      const queryOptions = { ...defaultOptions, ...options };

      let url = `${apiUrl}/Flower?page=${queryOptions.page}`;

      if (queryOptions.colors && queryOptions.colors.length > 0) {
        queryOptions.colors.forEach(color => {
          url += `&colors=${color}`;
        });
      }

      if (queryOptions.pageSize) {
        url += `&pageSize=${queryOptions.pageSize}`;
      }

      if (queryOptions.seasons && queryOptions.seasons.length > 0) {
        queryOptions.seasons.forEach(season => {
          url += `&seasons=${season}`;
        });
      }

      if (queryOptions.types && queryOptions.types.length > 0) {
        queryOptions.types.forEach(type => {
          url += `&types=${type}`;
        });
      }

      const response = await axios.get(url, authorization());
      return response.data;
    } catch (error) {
      console.error('Error fetching flowers:', error);
      throw error;
    }
  },

  getFlowerById: async (flowerId) => {
    try {
      const response = await axios.get(`${apiUrl}/Flower/${flowerId}`, authorization());
      return response.data;
    } catch (error) {
      console.error(`Error fetching flower with ID ${flowerId}:`, error);
      throw error;
    }
  },

  deleteFlowers: async (flowerId) => {
    try {
      const config = authorization()

      await axios.delete(`${apiUrl}/Flower/${flowerId}`, config)

      return null
    } catch (error) {
      if (error.response?.status === 400) {
        return error.response.data.title
      } else if (error.response?.status === 404) {
        return 'Error inesperado'
      } else {
        return 'Error inesperado'
      }
    }
  },

  getBouquets: async (options = {}) => {
    try {
      const defaultOptions = {
        page: 1,
        pageSize: 10,
        colors: []
      };

      const queryOptions = { ...defaultOptions, ...options };

      let url = `${apiUrl}/Bouquet/Customized?page=${queryOptions.page}`;

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

  getBouquetsNoCustomized: async (options = {}) => {
    try {
      const defaultOptions = {
        page: 1,
        pageSize: 10
      };

      const queryOptions = { ...defaultOptions, ...options };

      let url = `${apiUrl}/Bouquet?page=${queryOptions.page}`;

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

}
