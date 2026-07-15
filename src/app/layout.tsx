// Корневой лайаут (html, body) — ЖИВЕТ ТУТ
import type { Metadata } from 'next';
import Script from 'next/script';
import { AppProviders } from './providers';

export const metadata: Metadata = {
  title: 'Айсберг Маркет',
  description: 'Доска объявлений Сочи',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AppProviders>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </AppProviders>
      </body>
    </html>
  );
}
