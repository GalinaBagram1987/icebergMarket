"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
