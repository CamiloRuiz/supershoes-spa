import { http } from '../network';

export default {

  async getStores() {
    try {
      const { data } = await http.get('stores');
      return {
        data: data,
        error: false
      };
    } catch (err) {
      throw {
        data: [],
        error: true,
        message: err.response.data.message
      }
    }
  },

  async getArticles(store) {
    try {
      const { data } = await http.get(`stores/${store}/articles`);
      return {
        data: data,
        error: false
      };
    } catch (err) {
      throw {
        data: [],
        error: true,
        message: err.response.data.message
      }
    }
  },

  async saveStore(data) {
    try {
      const response = await http.post('stores', data);
      return {
        error: !response.data.success
      };
    } catch (err) {
      throw {
        error: true,
        message: err.response.data.message
      }
    }
  },

  async updateStore(data) {
    try {
      const response = await http.put(`stores/${data.id}`, data);
      return {
        error: !response.data.success
      };
    } catch (err) {
      throw {
        error: true,
        message: err.response.data.message
      }
    }
  },

  async deleteStore(store) {
    try {
      const response = await http.delete(`stores/${store}`);
      return {
        error: !response.data.success
      };
    } catch (err) {
      throw {
        error: true,
        message: err.response.data.message
      }
    }
  }
}
