'use client';

import styles from './SearchCategory.module.css';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib';

/**
 * Отображает форму поиска объявлений на главной странице.
 *
 * После отправки перенаправляет пользователя на страницу `/search`,
 * передавая поисковый запрос в параметре `q`.
 *
 * @returns Форма ввода и отправки поискового запроса.
 */

export const SearchCategory = () => {
  const t = useTranslations('icebergMarket'); // Хук для клиента
  return (
    <div className={styles.searchContainer}>
      <form action="/search" method="GET" className={styles.searchFormCateg}>
        <input
          type="text"
          name="q" // для Next.js, чтобы query-параметр попал в URL (?q=...)
          required
          placeholder=""
          className={styles.searchInputCateg}
        />
        <button type="submit" className={styles.searchButtonCateg}>
          {t('mainPage.searchButton')}
        </button>
      </form>
      <div className={styles.btnGroup}>
        <button className={cn(styles.btn, styles.btnLeft)}>{t('categoriesPage.searchButLeft')}</button>
        <button className={cn(styles.btn, styles.btnRight)}>{t('categoriesPage.searchButRight')}</button>
      </div>
    </div>
  );
};
