import { Metadata } from 'next';
import { Suspense } from 'react';
import { SubcategoryPage } from '@/_pages/subCategory';
import { serverFetchAndCachedCategory } from '@/entities/catalog';
import { buildFullPath } from '@/entities/lib';
import { isCategoryResponse } from '@/entities/lib';

/**
 * Тип для страницы покатегорий
 * примимает path.
 * для подкатегориий такого типа app/catalog/[categoryPath]/[...subcategoryPath]/page.tsx
 * некст возвращает основн строкой и далее объект
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
  console.log('[PAGE] before await params');
  const resolvedParams = await params;
  const fullPath = buildFullPath(resolvedParams);
  const subcategoryData = await serverFetchAndCachedCategory(fullPath);
  const safeSubcategoryData = isCategoryResponse(subcategoryData) ? subcategoryData : null;
  if (!safeSubcategoryData) {
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

/**
 * Для некс переносим асинхронную логику отдельно, чтобы потом обвернуть все в suspense
 */

const SubCategoryPageContent = async ({ params }: SubCategoryPageAppProps) => {
  const resolvedParams = await params;
  const fullPath = buildFullPath(resolvedParams);
  const subcategoryData = await serverFetchAndCachedCategory(fullPath);

  const safeSubcategoryData = isCategoryResponse(subcategoryData) ? subcategoryData : null;

  return <SubcategoryPage path={fullPath} subcategoryData={safeSubcategoryData} />;
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
