import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getCookie, deleteCookie } from '@/shared/lib';

/**
 * Подключает к экземпляру Axios интерцепторы запросов и ответов.
 *
 * Интерцептор запроса получает `accessToken` из cookie и добавляет его
 * в заголовок `Authorization` в формате `Bearer <token>`.
 *
 * Интерцептор ответа обрабатывает ошибку со статусом `401`:
 * удаляет недействительный токен и перенаправляет пользователя
 * на страницу авторизации.
 *
 * @param instance Экземпляр Axios, к которому подключаются интерцепторы.
 * @returns Переданный экземпляр Axios с настроенными интерцепторами.
 */

export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Используем готовую утилиту для поиска токена в куках
      const token = getCookie('accessToken');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      // Если бэк вернул 401 — срок дейсвия токена кончился, удаляем его
      if (error.response?.status === 401) {
        deleteCookie('accessToken');
        console.log('Токен невалиден, кука accessToken успешно удалена');

        // В Next.js на клиенте можно сделать редирект, если мы не на странице логина
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
