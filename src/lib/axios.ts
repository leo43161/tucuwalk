import axios from 'axios';

/**
 * Base Axios client — ready for future REST/MySQL backend on Ferozo.
 * All endpoints will live at NEXT_PUBLIC_API_URL (e.g. https://api.nortewalk.com).
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[NorteWalk API]', err.response?.data ?? err.message);
    return Promise.reject(err);
  }
);

export default apiClient;