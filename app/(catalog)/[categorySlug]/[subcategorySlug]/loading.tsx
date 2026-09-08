import { SubCategoryLoad } from '@/_pages/subCategory';
/**
 * Интерфейс для пропросов подкатегорий, которые придут от next.js
 */

interface SubCategoryLoadingAppProps {
  load?: string;
}

/**
 * Страница загрузки подкатегорий
 */

const CategoryLoadPage = ({ load }: SubCategoryLoadingAppProps) => {
  return <SubCategoryLoad load={load} />;
};

export default CategoryLoadPage;
