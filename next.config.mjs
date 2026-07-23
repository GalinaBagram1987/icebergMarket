/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Настройки проксирования, чтобы обойти CORS-ошибки с микросервисами
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        /* Универсальный путь: Next.js сам подставит нужное значение из активного .env файла */
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
      },
    ];
  },
};

// 2. Инициализируем плагин i18n
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 3. Экспортируем обернутый конфиг
export default withNextIntl(nextConfig);
