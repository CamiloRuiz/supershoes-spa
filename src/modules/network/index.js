import * as axiosConfig from 'axios';

axiosConfig.defaults.baseURL = 'http://supershoes.test/services/';
axiosConfig.defaults.headers.post['Content-Type'] = 'application/json';
axiosConfig.defaults.headers.put['Content-Type'] = 'application/json';
axiosConfig.defaults.headers.patch['Content-Type'] = 'application/json';
axiosConfig.defaults.headers.common.Accept = 'application/json';
axiosConfig.defaults.auth.username = 'my_user';
axiosConfig.defaults.auth.password = 'my_password';
axiosConfig.defaults.timeout = process.env.NODE_ENV === 'production' ? 5000 : 10000;

/** @constant {axios} http - Axios instance for http request without authorization */
export const http = axiosConfig.create();
export const UNEXPECTED_RESPONSE = new TypeError('Unexpected response');

export default {
  http,
  UNEXPECTED_RESPONSE,
};
