'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './sortPosts.module.css';
import { useTranslations } from 'next-intl';

/**
 * Переменная для компонента сортировки
 * value - ключ от бэка
 * labelKey - ключ фронта из i18n
 */

const SORT_OPTIONS = [
  { value: 'date:asc', labelKey: 'sort.firstEl' }, // По дате
  { value: 'price:asc', labelKey: 'sort.seconsEl' }, // Дешевле
  { value: 'price:desc', labelKey: 'sort.thirdEl' }, // Дороже
] as const;

/**
 * Фича сортировки
 * сортирует по дпте, по цене
 */

export const SortPost = () => {
  const t = useTranslations('icebergMarket'); // хук next-intl
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Текущая активная сортировка из URL
  const currentSort = searchParams.get('sort') || 'date:asc';

  // Находим объект текущей сортировки, чтобы отобразить его в кнопке
  const currentOption = SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  // Закрытие меню при клике вне контейнера
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Генерируем ссылку с новыми параметрами сортировки
  const getSortLink = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortValue);
    params.set('page', '1'); // при смене сортировки сбрасываем на 1-ю страницу
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button type="button" className={styles.triggerButton} onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen}>
        <span className={styles.icon}>↓↑</span>
        <span className={styles.activeLabel}>{t('sort.seconsEl')}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>V</span>
      </button>

      {isOpen && (
        <ul className={styles.menuList}>
          {SORT_OPTIONS.map((option) => {
            const isActive = option.value === currentSort;

            return (
              <li key={option.value} role="none">
                <Link
                  href={getSortLink(option.value)}
                  className={`${styles.menuLink} ${isActive ? styles.activeLink : ''}`}
                  onClick={() => setIsOpen(false)} // закрываем меню после выбора
                  role="menuitem"
                >
                  {t(currentOption.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
