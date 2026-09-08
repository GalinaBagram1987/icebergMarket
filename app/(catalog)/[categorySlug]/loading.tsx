import { CategoryLoad } from '@/_pages/category';

/**
 * Интерфейс для пропросов категорий, которые придут от next.js
 */

interface CategoryLoadingAppProps {
  load?: string;
}

/**
 * Страница загрузки категорий
 */

const CategoryLoadPage = ({ load }: CategoryLoadingAppProps) => {
  return <CategoryLoad load={load} />;
};

export default CategoryLoadPage;
