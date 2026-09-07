'use client';

import styles from './SearchMainPage.module.css';
import { useTranslations } from 'next-intl';

/**
 * Отображает форму поиска объявлений на главной странице.
 *
 * После отправки перенаправляет пользователя на страницу `/search`,
 * передавая поисковый запрос в параметре `q`.
 *
 * @returns Форма ввода и отправки поискового запроса.
 */

export const SearchMain = () => {
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
