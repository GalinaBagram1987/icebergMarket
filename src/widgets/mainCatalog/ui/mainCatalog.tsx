import { useMainCatalogQuery } from '../model/hooks';
import { CatalogGrid } from './CatalogGrid';
// Добавить еще два импорта скелетонов

/**
 * Основной каталог на главной странице
 *
 * @returns
 */

export const MainCatalog = () => {
  const { data, isPending, isError, refetch } = useMainCatalogQuery();

  const categories = data?.categories ?? [];

  if (isPending) {
    return null;
    {
      /*Рендерим скелетон загрузки */
    }
  }

  if (isError) {
    return null;
    {
      /*Рендерим скелетон ошибки. вызываем перезапрос onRetry={() => void refetch() */
    }
  }

  return <CatalogGrid categories={categories} />;
};
