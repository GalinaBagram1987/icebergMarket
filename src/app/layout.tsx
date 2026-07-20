// Корневой лайаут (html, body) — ЖИВЕТ ТУТ
import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { AppProviders } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import './globals.css';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 1440,
  initialScale: 1,
};

export const generateMetadata = async () => {
  const t = await getTranslations('icebergMarket.header');

  return {
    title: t('companyName').replace('\n', ' '),
    description: `Доска объявлений в городе ${t('city')}`,
    icons: {
      icon: '/images/favicon.png',
    },
  };
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // Получаем тексты на сервере
  const messages = await getMessages();

  return (
    <html lang="ru">
      <body>
        {/*  Оборачиваем в провайдер текстов, чтобы клиентские компоненты тоже имели к ним доступ */}
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <Header />
            {children}
            <Footer />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
