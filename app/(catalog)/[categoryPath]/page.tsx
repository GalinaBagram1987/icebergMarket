import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryPage } from '@/_pages/category';
import { serverFetchAndCashedCategory } from '@/entities/category';
import type { SubcategoryItem } from '@/_pages/category/model/types';
import { BackendMainCategory } from '@/shared/api/apiMethods/catalog';
/**
 * Тип для страницы категорий
 * примимает path. грузит метатеги и данные
 */

type CategoryPageAppProps = {
  params: Promise<{
    categoryPath: string;
  }>;
};

/**
 * Динамические метаданные страницы категории первого уровня.
 */

// export const generateMetadata = async ({ params }: CategoryPageAppProps): Promise<Metadata> => {
//   const { categoryPath } = await params;
// const path = categoryPath;
//   const category = await serverFetchAndCashedCategory(path);

//   if (!category) {
//     return {
//       title: 'Категория не найдена',
//       description: 'Запрашиваемая категория не найдена.',
//       robots: {
//         index: false,
//         follow: false,
//       },
//     };
//   }

//   return {
//     title: `${category.name} — Айсберг Маркет`,
//     description: `Товары и объявления в категории «${category.name}».`,
//   };
// };

/**
 *
 * Динаминческая страница каталога первой категории
 * компонент страницы (дописать позже)
 * примимает path, формирует путь в браузере, подгружает страницу
 * Метаданные (title, description) заданы динамически на основании названия раздела
 *
 * Вносить изменения в бизнесс-логику в компонент /написать тут
 */

const CategoryPageApp = async ({ params }: CategoryPageAppProps) => {
  const { categoryPath } = await params;

  const categoryData = (await serverFetchAndCashedCategory(categoryPath)) as unknown as BackendMainCategory;
  if (!categoryData) {
    notFound();
  }

  const subcategories: SubcategoryItem[] = (categoryData.categories || []) as unknown as SubcategoryItem[];

  return <CategoryPage path={categoryPath} subcategories={subcategories} />;
};

export default CategoryPageApp;
