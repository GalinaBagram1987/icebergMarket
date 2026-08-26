import axios from 'axios';
import { setupInterceptors } from '../interceptors';

const isServer = typeof window === 'undefined';

/**
 * Базовый экземпляр Axios для выполнения HTTP-запросов к API.
 *
 * Настройки:
 * - базовый URL определяется переменной окружения;
 * - максимальное время ожидания ответа — 10 секунд;
 * - данные отправляются в формате JSON.
 */

export const axiosInstance = axios.create({
  baseURL: isServer ? process.env.API_ORIGIN || 'http://45.149.154' : '/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Настроенный API-клиент с подключёнными интерцепторами.
 */

export const apiWithInterceptors = setupInterceptors(axiosInstance);
