'use client';
import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/lib/i18n';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider>
        <QueryProvider>{children}</QueryProvider>
      </ReduxProvider>
    </I18nextProvider>
  );
};
