'use cache';

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { SearchPostsResponse, SearchPostsRequestBody } from '@/shared/api/apiMethods/catalog/type';

/**
 * Функция получения и кеширования данных поиска
 * получает тело поиска в запрос
 * получает данные с бэка и кэширует
 */

export async function serverFetchAndCachedMainSearch(body: SearchPostsRequestBody): Promise<SearchPostsResponse> {
  cacheLife('minutes');
  cacheTag('category-main-search');
  try {
    const data = await catalogRequest.getMainSearchData(body);

    // Всегда вешаем общий тег для глобального сброса
    cacheTag('catalog-main-search-global');

    // Динамически привязываем кэш к категориям, которые попали в выдачу
    if (data?.posts && data.posts.length > 0) {
      // Собираем только уникальные category_id из результатов
      const uniqueCategoryIds = Array.from(new Set(data.posts.map((post) => post.category_id)));

      // Навешиваем теги для каждой категории
      uniqueCategoryIds.forEach((catId) => {
        cacheTag(`catalog-category-${catId}`);
      });
    }
    return data;
  } catch (error) {
    console.error(`Ошибка получения данных search: ${error}`);
    // Защита рантайма: возвращаем пустую структуру, чтобы страница каталога
    // не падала в белый экран при краше или таймауте бэкенда
    return {
      count: 0,
      posts: [],
    };
  }
}
