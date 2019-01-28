import { http } from '../network';

export default {

  endpoint: 'articles/',

  async getArticles() {
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

  async saveArticle(data) {
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

  async updateArticle(data) {
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

  async deleteArticle(article) {
    try {
      const response = await http.delete(this.endpoint + `${article}`);
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
