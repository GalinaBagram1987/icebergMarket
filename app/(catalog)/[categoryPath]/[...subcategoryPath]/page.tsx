import { Metadata } from 'next';
import { Suspense } from 'react';
import { SubcategoryPage } from '@/_pages/subCategory';
import { serverFetchAndCachedCategory } from '@/entities/category';
/**
 * Тип для страницы категорий
 * примимает path. грузит метатеги и данные
 */

type SubCategoryPageAppProps = {
  params: Promise<{
    categoryPath: string;
    subcategoryPath: string[];
  }>;
};

/**
 * Динамические метаданные страницы категории первого уровня.
 */

export const generateMetadata = async ({ params }: SubCategoryPageAppProps): Promise<Metadata> => {
  const { categoryPath } = await params;
  const path = categoryPath;
  //const currentPathString = subcategoryPath[subcategoryPath.length - 1];
  const subcategory = await serverFetchAndCachedCategory(path);

  if (!subcategory) {
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
    //   title: `${categories.name} — Айсберг Маркет`,
    //   description: `Товары и объявления в категории «${categories.name}».`,
  };
};

const SubCategoryPageContent = async ({ params }: SubCategoryPageAppProps) => {
  const { categoryPath } = await params;

  return <SubcategoryPage path={categoryPath} />;
};

/**
 *
 * Динаминческая страница каталога первой категории
 * компонент страницы (дописать позже)
 * примимает slug, формирует путь в браузере, подгружает страницу
 * Метаданные (title, description) заданы динамически на основании названия раздела
 *
 * Вносить изменения в бизнесс-логику в компонент /написать тут
 */

const SubCategoryPageApp = ({ params }: SubCategoryPageAppProps) => {
  return (
    <Suspense fallback={null}>
      <SubCategoryPageContent params={params} />
    </Suspense>
  );
};

export default SubCategoryPageApp;
