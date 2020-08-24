import axios from 'axios';
import {
  getRefreshToken,
  setAccessToken
} from '../helpers/localStorageService';
import setHeaders from '../helpers/setHeaders';

const auth = axios.create({
  baseURL: 'https://taskmanager.dev/api/users'
});

auth.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 403 &&
      error.response.data.errors[0].message === 'jwt expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      let res;
      try {
        res = await auth.post('/token', {
          token: getRefreshToken()
        });

        setAccessToken(res.data.accessToken);
        setHeaders(res.data.accessToken);
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${res.data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default auth;
