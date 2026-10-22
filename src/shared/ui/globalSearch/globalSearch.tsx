'use client';
import { type FormEvent } from 'react';
import type { GlobalSearchProps } from './globalSearch.types';
import styles from './globalSearch.module.css';
import { useTranslations } from 'next-intl';

/**
 * Отображает форму поиска объявлений на главной странице.
 *
 * После отправки перенаправляет пользователя на страницу `/search`,
 * передавая поисковый запрос в параметре `q`.
 *
 * @returns Форма ввода и отправки поискового запроса.
 */

export const GlobalSearch = ({ value, onChange, onSubmit, placeholder = '', isLoading, onFocus, className, disabled = false, onBlur }: GlobalSearchProps) => {
  const t = useTranslations('icebergMarket'); // Хук для клиента

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled || isLoading) return;
    onSubmit();
  };
  return (
    <div className={className}>
      <form className={styles.searchForm} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="q" // для Next.js, чтобы query-параметр попал в URL (?q=...)
          value={value}
          required
          placeholder={placeholder}
          className={styles.searchInput}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled || isLoading}
        />
        {isLoading && <div>{t('mainPage.loading')}</div>}

        <button type="submit" className={styles.searchButton} disabled={disabled || isLoading}>
          {t('mainPage.searchButton')}
        </button>
      </form>
    </div>
  );
};
