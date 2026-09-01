'use client';

import styles from './SearchMainPage.module.css';
import { useTranslations } from 'next-intl';
import type { SearchProps } from '../../module/type';

/**
 * Отображает форму поиска объявлений.
 *
 * Используется на главной странице, странице результатов поиска
 * После отправки перенаправляет пользователя на страницу результатов поиска `/search`,
 * передавая поисковый запрос в параметре `q`.
 *
 * получает пропс с функцией запроса общего поиска
 *
 * @returns Форма ввода и отправки поискового запроса.
 */

export const SearchMain = ({ onClick }: SearchProps) => {
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
      <button type="submit" className={styles.searchButton} onClick={onClick}>
        {t('mainPage.searchButton')}
      </button>
    </form>
  );
};
