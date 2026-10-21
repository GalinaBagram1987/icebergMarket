'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { CategoryFilterBadgesProps } from '../model/type';
import styles from './categoryFilterBadges.module.css';

export const CategoryFilterBadges = ({ categories }: CategoryFilterBadgesProps) => {
  const searchParams = useSearchParams();
  // Сохраняем текущий поисковый запрос
  const currentQuery = searchParams.get('q') || '';

  if (!categories || categories.length === 0) return;
  return (
    <div className={}>
      <ul>
        {categories.map((category) => {
          const queryParams = new URLSearchParams();
          if (currentQuery) {
            queryParams.set('q', currentQuery);
          }
          queryParams.set('page', '1');
          return (
            <li key={category.id}>
              {/* Прямая ссылка без языковых префиксов */}
              <Link href={`/catalog/${category.slug}?${queryParams.toString()}`} className={styles.badgeLink}>
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.categoryCount}>{new Intl.NumberFormat('ru-RU').format(category.count)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
