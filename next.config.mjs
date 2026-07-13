/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Настройки проксирования, чтобы обойти CORS-ошибки с микросервисами
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        // Если продакшн — шлем на боевой домен, если разработка — на ваш локальный шлюз 8080
        destination: isProd
          ? "свой внешний домен"
          : "http://localhost:8080/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
