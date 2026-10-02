import Link from 'next/link';
import type { BackendCategoryItem } from '@/shared/api/apiMethods/catalog';
import styles from './breadcrumbsItem.module.css';
import { getTranslations } from 'next-intl/server';
import { serverFetchAndCachedCategory } from '@/entities/catalog/api/fetchAndCachedCategory';
import { serverFethcAndCachedSubcategory } from '@/entities/catalog/api/fetchAndCashedSubcategory';
/**
 * Типы для комонента хлебных крошек
 */

export type BreadcrumbsProps = {
  currentCategory: BackendCategoryItem;
  parentCategory: BackendCategoryItem;
};

/**
 * Визуальное отображение хлебных крошек
 */

export const Breadcrumbs = async ({ currentCategory, parentCategory }: BreadcrumbsProps) => {
  const t = await getTranslations('icebergMarket');
  if (!currentCategory || !parentCategory) return null;

  const pathSegments = currentCategory.path.split('/');

  const resolvedSegments: { name: string; path: string }[] = [];

  for (let i = 0; i < pathSegments.length - 1; i += 1) {
    const segmentPath = pathSegments.slice(0, i + 1).join('/');

    // Если это первый сегмент
    if (segmentPath === parentCategory.path) {
      resolvedSegments.push({
        name: parentCategory.name,
        path: parentCategory.path,
      });
    } else {
      try {
        let res;

        // РАЗДЕЛЯЕМ ЗАПРОСЫ ПО ГЛУБИНЕ ВЛОЖЕННОСТИ
        if (i === 0) {
          // Первый уровень (если вдруг путь не совпал с parentCategory)
          res = await serverFetchAndCachedCategory(segmentPath);
        } else {
          // ГЛУБОКИЙ УРОВЕНЬ (вызываем функцию для подкатегорий)
          res = await serverFethcAndCachedSubcategory(segmentPath);
        }

        // Достаем имя в зависимости от того, какую структуру ответа возвращает эндпоинт
        if (res && res.category) {
          resolvedSegments.push({
            name: res.category.name,
            path: res.category.path,
          });
        }
      } catch (error) {
        console.error(`[BREADCRUMBS ERROR] Не удалось загрузить уровень: ${segmentPath}`, error);
      }
    }
  }
  return (
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
      <ul className={styles.list}>
        {/* Главная страница (есть всегда) */}
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            {t('breadcrumbs.main')}
          </Link>
          <span aria-hidden="true" className={styles.separator}>
            {'>'}
          </span>
        </li>

        {/* ВСЕ РОДИТЕЛИ И СЕРЕДИНА (Выводятся динамически строго по порядку) */}
        {resolvedSegments.map((segment) => (
          <li key={segment.path} className={styles.item}>
            <Link className={styles.link} href={`/${segment.path}`}>
              {segment.name}
            </Link>
            <span aria-hidden="true" className={styles.separator}>
              {'>'}
            </span>
          </li>
        ))}

        {/* Текущая активная подкатегория (Последний элемент, без ссылки) */}
        <li aria-current="page" className={styles.item}>
          <span className={styles.current}>{currentCategory.name}</span>
        </li>
      </ul>
    </nav>
  );
};
