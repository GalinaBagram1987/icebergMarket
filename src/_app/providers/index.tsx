import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { icebergToastConfig } from '@/shared/ui/toast';

import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';

interface AppProvidersProps {
  /** Дочерние компоненты, которым предоставляются контексты приложения. */
  children: ReactNode;
}

/**
 * Объединяет глобальные провайдеры приложения.
 *
 * Подключает Redux-хранилище и React Query и toast
 * ко всем вложенным компонентам.
 */

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        {children}
        <Toaster
          //position="top-center" // Выравнивание вашей плашки 431px строго по центру экрана гориз
          toastOptions={icebergToastConfig}
          /*  по центру экрана вертикаль, горизонт*/
          containerStyle={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
          }}
        />
      </QueryProvider>
    </ReduxProvider>
  );
};
