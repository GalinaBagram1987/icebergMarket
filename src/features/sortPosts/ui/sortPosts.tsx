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

const SortPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('icebergMarket'); // Хук для клиента
  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.trigerButton}>
        <span className={styles.icon}>↓↑</span>
        <span className={styles.activeLabel}>t('sort.seconsEl')</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>V</span>
      </button>
      {isOpen && <ul className={styles.menuList}></ul>}
    </div>
  );
};
