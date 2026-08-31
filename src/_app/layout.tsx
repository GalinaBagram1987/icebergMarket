import type { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { AppProviders } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import './globals.css';

/** Свойства корневого layout приложения. */
interface RootLayoutProvider {
  /** Содержимое текущей страницы */
  children: ReactNode;
}

/** Размер  видимой области окна браузера*/
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * Формирует метаданные приложения на основе текущей локали.
 * Next.js автоматически добавляет возвращаемые значения
 * в тег `<head>` страницы.
 * @returns Асинхронно сформированные метаданные страницы.
 */

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('icebergMarket.header');

  return {
    title: t('companyName').replace('\n', ' '),
    description: `Доска объявлений в городе ${t('city')}`,
    icons: {
      icon: '/images/favicon.png',
    },
  };
};

/**
 * Корневой layout приложения.
 *
 * Layout подключает глобальные стили, провайдеры приложения,
 * локализованные сообщения, шапку и подвал сайта.
 * Определяет общие метаданные для всего приложения.
 * При необходимости их можно переопределить
 * в layout или на отдельных страницах.
 *
 * @param props Свойства корневого layout.
 * @param props.children Содержимое текущей страницы.
 * @returns Корневую HTML-структуру приложения.
 */

const RootLayout = async ({ children }: RootLayoutProvider) => {
  const messages = await getMessages();
  return (
    <html lang="ru">
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
