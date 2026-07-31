'use client';

import { type ReactNode } from 'react';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/_app/store';

interface ReduxProviderProps {
  children: ReactNode;
}

/**
 * Подключает Redux-хранилище к клиентской части приложения.
 *
 * Хранилище создаётся один раз для каждого экземпляра провайдера
 * и сохраняется между повторными рендерами компонента.
 */

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);
  // Создаём хранилище только при первом рендере провайдера.
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
