import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getCookie, deleteCookie } from '@/shared/lib';

// в next токен живет в куки. Проверяем его и получаем из куки

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
