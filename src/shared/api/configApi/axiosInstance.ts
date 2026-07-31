import axios from 'axios';
import { setupInterceptors } from '../interceptors';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Базовый экземпляр Axios для выполнения HTTP-запросов к API.
 *
 * Настройки:
 * - базовый URL определяется переменной окружения;
 * - максимальное время ожидания ответа — 10 секунд;
 * - данные отправляются в формате JSON.
 */

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Настроенный API-клиент с подключёнными интерцепторами.
 */

export const apiWithInterceptors = setupInterceptors(axiosInstance);
