/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

// const isProd = process.env.NODE_ENV === 'production';
const API_ORIGIN = process.env.API_ORIGIN;

const nextConfig = {
  trailingSlash: true, // заставляет Next.js всегда добавлять слеш в конце URL (бэк только со слешем)
  // разрешаем скачивать картинки с бэка
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '45.149.154.20',
        port: '80',
        pathname: '/**', // Разрешаем любые папки с картинками на этом сервере
      },
    ],
  },

  // Настройки проксирования, чтобы обойти CORS-ошибки с микросервисами
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        /* Универсальный путь: Next.js сам подставит нужное значение из активного .env файла */
        /* Next.js чисто склеит http://45.149.154.20:80/api/v:80 с /api/v1/catalog*/
        destination: `${API_ORIGIN}/api/v1/:path*/`,
      },
    ];
  },
};

// 2. Инициализируем плагин i18n
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 3. Экспортируем обернутый конфиг
export default withNextIntl(nextConfig);
