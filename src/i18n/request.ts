import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = 'ru';

  return {
    locale,
    // Просто указываем путь до вашего FSD-слоя!
    messages: (await import('@/shared/lib/i18n/ru.json')).default,
  };
});
