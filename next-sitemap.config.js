/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true, // генерировать robots.txt
  sitemapSize: 5000, // лимит URL в одном файле (для больших сайтов)
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/profile/*'], // исключаем служебные страницы
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin/' },
    ],
    additionalSitemaps: [
      // если есть отдельные карты для объявлений добавить
    ],
  },
  // Для динамических маршрутов (миллионы страниц)
  transform: async (config, path) => {
    // Добавляем приоритет для главной страницы
    if (path === '/') {
      return { ...config, priority: 1.0, changefreq: 'hourly' };
    }
    // Для страниц объявлений — обновлять чаще
    if (path.startsWith('/ad/')) {
      return { ...config, priority: 0.8, changefreq: 'hourly' };
    }
    return config;
  },
};

export default config;
