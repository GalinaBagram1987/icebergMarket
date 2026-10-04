import { serverFetchAndCachedCategory } from '@/entities/catalog';
import { serverFethcAndCachedSubcategory } from '@/entities/catalog/api/fetchAndCashedSubcategory';
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
 * Хлебные крошки принимают
 * currentCategory: BackendCategoryItem;
 * parentCategory: BackendCategoryItem;
 * Асинхронный загрузчик для крошек,
 * чтобы получить нужные категории
 */

const BreadcrumbsServerLoader = async ({ categoryPath, subcategoryPath }: SearchMapPageProps) => {
  const fullSubPath = subcategoryPath ? `${categoryPath}/${subcategoryPath.join('/')}` : categoryPath;
  // Параллельно запрашиваем объекты категорий из кэша
  const [parentData, subData] = await Promise.all([serverFetchAndCachedCategory(categoryPath), subcategoryPath ? serverFethcAndCachedSubcategory(fullSubPath) : null]);

  const currentCategory = subData?.category || parentData?.category || null;
  const parentCategory = parentData?.category || null;
  return (
    <div>
      <Breadcrumbs currentCategory={currentCategory} parentCategory={parentCategory} />
      <SearchCategory />
    </div>
  );
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
      <BreadcrumbsServerLoader categoryPath={categoryPath} subcategoryPath={subcategoryPath} />
      <SearchCategory />
    </div>
  );
};
