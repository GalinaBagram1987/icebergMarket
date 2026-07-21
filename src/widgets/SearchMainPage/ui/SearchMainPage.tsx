'use client';

import styles from './SearchMainPage.module.css';
// import { cn } from '@/shared/lib/classNames';
import { useTranslations } from 'next-intl';

export const SearchMain = async () => {
  const t = useTranslations('icebergMarket'); // Хук для клиента
  return (
    <form action="/search" method="GET" className={styles.searchForm}>
      <input
        type="text"
        name="q" // для Next.js, чтобы query-параметр попал в URL (?q=...)
        required
        placeholder=""
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        {t('mainPage.searchButton')}
      </button>
    </form>
  );
};
