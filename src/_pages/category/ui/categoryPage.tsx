import type { CategoryPageProps } from '../model/types';

/**
 * Основной комопнент категорий
 */

export const CategoryPage = ({ slug }: CategoryPageProps) => {
  return <div>Здесь будет динамически сформированаая категория {slug}</div>;
};
