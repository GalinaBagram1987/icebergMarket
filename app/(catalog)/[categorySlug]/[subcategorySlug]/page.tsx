import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SubcategoryPage } from '@/_pages/subCategory';
import { serverFetchAndCashedCategory } from '@/entities/category';
/**
 * Тип для страницы категорий
 * примимает slug. грузит метатеги и данные
 */

type SubCategoryPageAppProps = {
  params: Promise<{
    path: string;
  }>;
};

/**
 * Динамические метаданные страницы категории первого уровня.
 */

// export const generateMetadata = async ({ params }: SubCategoryPageAppProps) => {
//   const { path } = await params;
//   const category = serverFetchAndCashedCategory(path);

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
 * примимает slug, формирует путь в браузере, подгружает страницу
 * Метаданные (title, description) заданы динамически на основании названия раздела
 *
 * Вносить изменения в бизнесс-логику в компонент /написать тут
 */

const SubCategoryPageApp = async ({ params }: SubCategoryPageAppProps) => {
  const { path } = await params;
  return <SubcategoryPage path={path} />;
};

export default SubCategoryPageApp;
