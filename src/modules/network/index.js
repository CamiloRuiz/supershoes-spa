import * as axiosConfig from 'axios';

axiosConfig.defaults.baseURL = 'http://supershoes.test/services/';
axiosConfig.defaults.headers.post['Content-Type'] = 'application/json';
axiosConfig.defaults.headers.put['Content-Type'] = 'application/json';
axiosConfig.defaults.headers.patch['Content-Type'] = 'application/json';
axiosConfig.defaults.headers.common.Accept = 'application/json';
axiosConfig.defaults.auth = {
  username: 'my_user',
  password: 'my_password'
};

axiosConfig.defaults.timeout = process.env.NODE_ENV === 'production' ? 5000 : 10000;

/** @constant { http } Axios instance for http request */
export const http = axiosConfig.create();
