import { Suspense } from 'react';

import { CategoryPageProps } from '@/_pages/category';
import { SubCategoryPageProps } from '@/_pages/subCategory';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { SearchCategory } from '@/widgets/SearchCategory';

/**
 * Пропсы сборки страницы поиска
 */

export type SearchMapPageProps = {
  categoryPath: string;
  subcategoryPath: string[] | null;
};

/**
 * Сборка страницы поиска принимает пути
 * возвращает компнент
 *
 */

export const SearchMapPage = ({ categoryPath, subcategoryPath }: SearchMapPageProps) => {
  // Выбор пути. Если subcategoryPath есть, склеиваем массив через слэш.
  // Если нет — берем просто родительский путь.
  // На выходе строка: "avto-moto" или "avto-moto/zapchasti/moto"

  const fullPath = subcategoryPath ? `${categoryPath}/${subcategoryPath.join('/')}` : categoryPath;

  return (
    <div className="container">
      <Breadcrumbs categoryPath={categoryPath} subcategoryPath={subcategoryPath} />
      <SearchCategory />
    </div>
  );
};
