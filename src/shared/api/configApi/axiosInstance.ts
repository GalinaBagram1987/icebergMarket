import axios from 'axios';
import { setupInterceptors } from '../interceptors';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// console.log('NEXT_PUBLIC_API_URL:', BASE_URL);

// if (!BASE_URL) {
//   throw new Error('NEXT_PUBLIC_API_BASE_URL не задан');
// }

/**
 * Базовый экземпляр Axios для выполнения HTTP-запросов к API.
 *
 * Настройки:
 * - базовый URL определяется переменной окружения;
 * - максимальное время ожидания ответа — 10 секунд;
 * - данные отправляются в формате JSON.
 */

export const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Настроенный API-клиент с подключёнными интерцепторами.
 */

export const apiWithInterceptors = setupInterceptors(axiosInstance);
