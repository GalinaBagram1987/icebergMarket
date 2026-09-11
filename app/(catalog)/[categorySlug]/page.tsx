import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryPage } from '@/_pages/category';
import { serverFetchAndCashedCategory } from '@/entities/category';

/**
 * Тип для страницы категорий
 * примимает slug. грузит метатеги и данные
 */

type CategoryPageAppProps = {
  params: Promise<{
    path: string;
  }>;
};

/**
 * Динамические метаданные страницы категории первого уровня.
 */

// export const generateMetadata = async ({ params }: CategoryPageAppProps) => {
//   const { path } = await params;
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
 * примимает slug, формирует путь в браузере, подгружает страницу
 * Метаданные (title, description) заданы динамически на основании названия раздела
 *
 * Вносить изменения в бизнесс-логику в компонент /написать тут
 */

const CategoryPageApp = async ({ params }: CategoryPageAppProps) => {
  const { path } = await params;
  const category = await serverFetchAndCashedCategory(path);
  return <CategoryPage path={path} />;
};

export default CategoryPageApp;
