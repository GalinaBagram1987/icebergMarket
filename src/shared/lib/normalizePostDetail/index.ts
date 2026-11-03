import { normalizeAttributes } from '../normalizeAttributes';
import type { AttributeItem } from '@/shared/api/apiMethods/catalog/type';
import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Тип для нормализции данных
 */

export type ClientPostDetail = Omit<PostDetailResponse, 'post_id' | 'attributes' | 'is_favourite'> & {
  id: string; // Переименовали post_id -> id для единообразия в проекте
  attributes: AttributeItem[];
  is_favourite: boolean; // Строку "True"/"False" переведем в нормальный boolean
};

/**
 * Бэк присылает другие наименования
 * и строку вместо булевых значение
 * Нормализуем данные поста, пришедшие с бэка
 * @param post
 * @returns тот же пост, только нормализованный
 */

export const normalizePostDetail = (raw: PostDetailResponse): ClientPostDetail => {
  const { post_id, attributes, is_favourite, ...rest } = raw;
  return {
    ...rest,
    id: post_id,
    attributes: normalizeAttributes(attributes),
    is_favourite: false,
  };
};
