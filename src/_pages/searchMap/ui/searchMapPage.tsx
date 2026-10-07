import { Suspense } from 'react';
import { serverFetchAndCachedCategory } from '@/entities/catalog';
import { serverFethcAndCachedSubcategory } from '@/entities/catalog/api/fetchAndCachedSubcategory';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { SearchCategory } from '@/widgets/SearchCategory';
import { SearchMapFilterWidget } from '@/widgets/searchMapFilterWidget';

export type SearchMapPageProps = {
  categoryPath: string;
  subcategoryPath: string[] | null;
};

const BreadcrumbsServerLoader = async ({ categoryPath, subcategoryPath }: SearchMapPageProps) => {
  let parentCategoryData = null;
  let subCategoryData = null;

  try {
    parentCategoryData = await serverFetchAndCachedCategory(categoryPath);

    if (subcategoryPath && subcategoryPath.length > 0) {
      const fullSubPath = `${categoryPath}/${subcategoryPath.join('/')}`;
      subCategoryData = await serverFethcAndCachedSubcategory(fullSubPath);
    }
  } catch (error) {
    console.error('[MAP BREADCRUMBS ERROR] Ошибка при фоновой загрузке кэша:', error);
    return null;
  }

  const currentCategory = subCategoryData?.category || parentCategoryData?.category || null;

  const parentCategory = subCategoryData?.category ? parentCategoryData?.category || null : parentCategoryData?.category || null;

  if (!currentCategory) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs currentCategory={currentCategory} parentCategory={parentCategory} />
    </div>
  );
};

export const SearchMapPage = ({ categoryPath, subcategoryPath }: SearchMapPageProps) => {
  return (
    <div className="container">
      <Suspense fallback={null}>
        <BreadcrumbsServerLoader categoryPath={categoryPath} subcategoryPath={subcategoryPath} />
      </Suspense>

      <SearchCategory />
      <Suspense fallback={null}>
        <SearchMapFilterWidget />
      </Suspense>
    </div>
  );
};
