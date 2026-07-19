/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Настройки проксирования, чтобы обойти CORS-ошибки с микросервисами
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        // Если продакшн — шлем на боевой домен, если разработка — на ваш локальный шлюз 8080
        // Временная заглушка для продакшна, чтобы Vercel не ругался на синтаксический формат URL
        destination: isProd
          ? 'https://typicode.com*' // сюда добавить бэк
          : 'http://localhost:8080/api/v1/:path*',
      },
    ];
  },
};

// 2. Инициализируем плагин i18n
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 3. Экспортируем обернутый конфиг
export default withNextIntl(nextConfig);
