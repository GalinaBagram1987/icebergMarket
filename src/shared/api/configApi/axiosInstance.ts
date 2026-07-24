import axios from 'axios';
import { setupInterceptors } from '../interceptors';

// URL из переменных окружения или запасной (fallback)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiWithInterceptors = setupInterceptors(axiosInstance);
