'use client';
import { type FormEvent } from 'react';

import styles from './SearchCategory.module.css';
import { GlobalAndCategorySearchProps } from './globalAndCategorySearch.types';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib';

/**
 * Отображает форму поиска объявлений по всему сайту .
 *
 * После отправки перенаправляет пользователя на страницу `/search`,
 * передавая поисковый запрос в параметре `q`.
 *
 * @returns Форма ввода и отправки поискового запроса.
 */

export const GlobalAndCategorySearch = ({ value, searchMode, onChange, onModeChange, onSubmit }: GlobalAndCategorySearchProps) => {
  const t = useTranslations('icebergMarket'); // Хук для клиента
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchFormCateg} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="q" // для Next.js, чтобы query-параметр попал в URL (?q=...)
          required
          placeholder=""
          className={styles.searchInputCateg}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className={styles.searchButtonCateg}>
          {t('mainPage.searchButton')}
        </button>
      </form>
      <div className={styles.btnGroup}>
        <button className={cn(styles.btn, styles.btnLeft, searchMode === 'section' ? styles.btnLeftActive : '')} onClick={() => onModeChange('section')}>
          {t('categoriesPage.searchButLeft')}
        </button>
        <button className={cn(styles.btn, styles.btnRight, searchMode === 'global' ? styles.btnRightActive : '')} onClick={() => onModeChange('global')}>
          {t('categoriesPage.searchButRight')}
        </button>
      </div>
    </div>
  );
};
