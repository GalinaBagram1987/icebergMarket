import type { CategoryPageProps } from '../model/types';

/**
 * Основной комопнент категорий
 */

export const CategoryPage = ({ path }: CategoryPageProps) => {
  return <div>Здесь будет динамически сформированаая категория {path}</div>;
};
