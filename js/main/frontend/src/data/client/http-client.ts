// src/lib/axios.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const API_ENDPOINT = import.meta.env.VITE_REST_API_ENDPOINT;
const AUTH_TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'authToken';

if (!API_ENDPOINT) {
  throw new Error('VITE_REST_API_ENDPOINT is not defined in .env file');
}

const Axios = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use((config) => {
  const cookies = Cookies.get(AUTH_TOKEN_KEY);
  let token = '';
  if (cookies) {
    try {
      token = JSON.parse(cookies)?.token;
    } catch (err) {
      console.error('Error parsing auth token from cookies', err);
    }
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && [401, 403].includes(error.response.status)) ||
      (error.response?.data?.message === 'PICKBAZAR_ERROR.NOT_AUTHORIZED')
    ) {
      Cookies.remove(AUTH_TOKEN_KEY);
      window.location.reload(); // Or use navigation if using react-router
    }
    return Promise.reject(error);
  }
);

export default Axios;
