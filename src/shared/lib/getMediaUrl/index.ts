const API_BASE_URL = process.env.NEXT_PUBLIC_API_ORIGIN || 'https://testback.ru';
const DEFAULT_FALLBACK = '/img/product-placeholder.jpg';

/**
 * Хэлпер для формирования url для получения фото
 */

export const getMediaUrl = (directoryName?: string | null, fileName?: string | null, fallBack = DEFAULT_FALLBACK): string => {
  if (!fileName) return fallBack;
  const cleanFile: string = fileName.trim();

  // Если уже пришла полная внешняя ссылка или локальный файл из public
  if (/^https?:\/\//i.test(cleanFile)) return cleanFile;
  if (cleanFile.startsWith('/') && !cleanFile.startsWith('//')) return cleanFile;

  if (cleanFile.includes('/')) {
    return `${API_BASE_URL}/media/get-image/${cleanFile.replace(/^\/+/, '')}`;
  }

  // стандартный кейс dir + file
  const cleanDir = directoryName?.trim().replace(/^\/+|\/$/g, '');
  if (!cleanDir) return DEFAULT_FALLBACK;

  return `${API_BASE_URL}/media/get-image/${cleanDir}/${cleanFile}`;
};
