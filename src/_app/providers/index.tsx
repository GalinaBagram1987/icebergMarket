import type { ReactNode } from 'react';
import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';

interface AppProvidersProps {
  /** Дочерние компоненты, которым предоставляются контексты приложения. */
  children: ReactNode;
}

/**
 * Объединяет глобальные провайдеры приложения.
 *
 * Подключает Redux-хранилище и React Query
 * ко всем вложенным компонентам.
 */

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
};
