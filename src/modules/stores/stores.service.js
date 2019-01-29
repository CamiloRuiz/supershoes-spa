import { http } from '../network';

export default {

  endpoint: 'stores/',

  async getStores() {
    try {
      const { data } = await http.get(this.endpoint);
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

  async getStore(store) {
    try {
      const { data } = await http.get(this.endpoint + `${store}`);
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
      const { data } = await http.get(this.endpoint + `${store}/articles`);
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
      const response = await http.post(this.endpoint, data);
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
      const response = await http.put(this.endpoint + `${data.id}`, data);
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
      const response = await http.delete(this.endpoint + `${store}`);
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
