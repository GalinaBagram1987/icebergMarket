import type { Metadata } from 'next';
import { CategoryPage } from '@/_pages/category';
import { serverFetchAndCachedCategory } from '@/entities/catalog';
import { Suspense } from 'react';

/**
 * Тип для страницы категорий
 * примимает path. грузит метатеги и данные
 * searchParams - втроенная в некс фича - ловит изменения из поиска и добавляет в url
 */

type CategoryPageAppProps = {
  params: Promise<{
    categoryPath: string;
  }>;
  // searchParams: Promise<{
  //   search?: string | string[];
  //   page?: string | string[];
  //   sort?: string | string[];
  // }>;
};

/**
 * Динамические метаданные страницы категории первого уровня.
 */

export const generateMetadata = async ({ params }: CategoryPageAppProps): Promise<Metadata> => {
  console.log('[PAGE] before await params');

  const { categoryPath } = await params;

  const path = categoryPath;
  const category = await serverFetchAndCachedCategory(path);

  if (!category) {
    return {
      title: 'Категория не найдена',
      description: 'Запрашиваемая категория не найдена.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    // title: `${category.name} — Айсберг Маркет`,
    // description: `Товары и объявления в категории «${category.name}».`,
  };
};

const CategoryPageContent = async ({ params }: CategoryPageAppProps) => {
  const { categoryPath } = await params;
  return <CategoryPage path={categoryPath} />;
};

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
  return (
    <Suspense fallback={null}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
};

export default CategoryPageApp;
