'use client';
import { type ReactNode } from 'react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  /** Дочерние компоненты, которым предоставляется доступ к React Query. */
  children: ReactNode;
}

/**
 * Подключает React Query к клиентской части приложения
 * и задаёт стандартные параметры работы с запросами и кэшем.
 */

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Данные считаются свежими в течение 1 минуты
            gcTime: 5 * 60 * 1000, //  Данные будут храниться в кэше 5 минут после того, как на них никто не ссылается.
            refetchOnWindowFocus: false, // выкл автом обновл при смене вкладки
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
