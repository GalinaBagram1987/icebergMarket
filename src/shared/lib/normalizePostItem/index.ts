import { normalizeAttributes } from '../normalizeAttributes';
import type { PostItemProps } from '@/entities/posts/model/types';

/**
 * Функция принимает сырые параметры с бэка
 * и нормализует их под типы данных
 * @param rawPosts
 * @returns объект нормализованных данных
 */

export const normalizedPostItem = (rawPosts: any): PostItemProps => {
  return {
    ...rawPosts,
    attributes: normalizeAttributes(rawPosts.attributes),
    price: Number(rawPosts.price),
    date: Number(rawPosts.date),
  };
};
