/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
const API_ORIGIN = process.env.API_ORIGIN || 'http://45.149.154.20';

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
        basePath: false,
      },
    ];
  },

  cacheComponents: true,

  cacheLife: {
    minutes: {
      // настройка для каталога
      stale: 30, // клиентский Router Cache — 30 секунд
      revalidate: 600, // после 10 минут следующий запрос запустит обновление
      expire: 3600, // после 1 часа запрос должен дождаться свежих данных
    },

    seconds: {
      // настройка для постов
      stale: 30, // меньше 30 секунд всё равно не применяется
      revalidate: 45, // обновление после 45 секунд
      expire: 300, // обязательное получение свежих данных после 5 минут
    },
  },
};

// 2. Инициализируем плагин i18n
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 3. Экспортируем обернутый конфиг
export default withNextIntl(nextConfig);
