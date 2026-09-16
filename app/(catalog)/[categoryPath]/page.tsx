import type { Metadata } from 'next';
import { CategoryPage } from '@/_pages/category';
import { serverFetchAndCashedCategory } from '@/entities/category';

/**
 * Тип для страницы категорий
 * примимает path. грузит метатеги и данные
 * searchParams - втроенная в некс фича - ловит изменения из поиска и добавляет в url
 */

type CategoryPageAppProps = {
  params: Promise<{
    categoryPath: string;
  }>;
  searchParams: Promise<{
    search?: string | string[];
    page?: string | string[];
    sort?: string | string[];
  }>;
};

/**
 * Динамические метаданные страницы категории первого уровня.
 */

export const generateMetadata = async ({ params }: CategoryPageAppProps): Promise<Metadata> => {
  const { categoryPath } = await params;
  const path = categoryPath;
  const category = await serverFetchAndCashedCategory(path);

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

/**
 *
 * Динаминческая страница каталога первой категории
 * компонент страницы (дописать позже)
 * примимает path, формирует путь в браузере, подгружает страницу
 * Метаданные (title, description) заданы динамически на основании названия раздела
 *
 * Вносить изменения в бизнесс-логику в компонент /написать тут
 */

const CategoryPageApp = async ({ params, searchParams }: CategoryPageAppProps) => {
  const { categoryPath } = await params;
  const query = await searchParams;

  // 2. Достаем значения (если массив — берем первый элемент)
  const search = Array.isArray(query.search) ? query.search[0] : query.search;
  const page = Array.isArray(query.page) ? query.page[0] : query.page;
  const sort = Array.isArray(query.sort) ? query.sort[0] : query.sort;

  <CategoryPage
    path={categoryPath}
    query={{
      search: search ?? '',
      page: page ?? '1',
      sort: sort ?? 'new',
    }}
  />;
};

export default CategoryPageApp;
