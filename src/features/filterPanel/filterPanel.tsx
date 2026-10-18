'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib';
import styles from './filterPanel.module.css';

/**
 * Фича фильтрации
 * Нужена для фильтрации по подкаталогу
 * и фильтрации в поиске по карте
 */

export const FilterPanel = () => {
  const t = useTranslations('icebergMarket');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition(); // ожидает, начать переход

  // Инициализируем локальное состояние для инпутов из URL
  const [priceFrom, setPriceFrom] = useState(searchParams.get('priceFrom') || '');
  const [priceTo, setPriceTo] = useState(searchParams.get('priceTo') || '');

  // Чекбоксы считываем прямо из URL
  const isNew = searchParams.get('isNew') === 'true';
  const isUsed = searchParams.get('isUsed') === 'true';
  const onlyWithPhoto = searchParams.get('onlyWithPhoto') === 'true';

  // Обработчик мгновенного переключения чекбоксов в URL
  const handleCheckboxChange = (field: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set(field, 'true');
    } else {
      params.delete(field);
    }
    params.set('page', '1'); // Сбрасываем страницу на первую при смене фильтра

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Сабмит формы (Применение текстовых фильтров цены)
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (priceFrom.trim()) params.set('priceFrom', priceFrom.trim());
    else params.delete('priceFrom');

    if (priceTo.trim()) params.set('priceTo', priceTo.trim());
    else params.delete('priceTo');

    params.set('page', '1');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleFormSubmit}>
      <div className={styles.filterPanel}>
        {/* Фильтр Цены */}
        <div className={styles.priceFilter}>
          <span className={cn(styles.filterHead, styles.filterHeadPrice)}>{t('filterPanel.price')}</span>
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.priceFrom')}</span>
          <input type="text" className={cn(styles.priceInputFirst, styles.priceInputFirstMargin)} value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} />
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.priceTo')}</span>
          <input type="text" className={cn(styles.priceInputSecond, styles.priceInputSecondMargin)} value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
        </div>

        {/* Фильтр Состояния */}
        <div className={styles.stateFilter}>
          <span className={cn(styles.filterHead, styles.filterHeadState)}>{t('filterPanel.productState')}</span>
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.productStateNew')}</span>
          <input type="checkbox" checked={isNew} onChange={(e) => handleCheckboxChange('isNew', e.target.checked)} className={cn(styles.squareInput, styles.firstSquareMargin)} />
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.productStateUsed')}</span>
          <input type="checkbox" checked={isUsed} onChange={(e) => handleCheckboxChange('isUsed', e.target.checked)} className={cn(styles.squareInput, styles.secondSquareMargin)} />
        </div>

        {/* Фильтр Только с фото */}
        <div className={styles.onlyPhotoFilter}>
          <span className={cn(styles.filterHead, styles.filterHeadPhoto)}>{t('filterPanel.onlyWithPhoto')}</span>
          <input type="checkbox" className={cn(styles.squareInput, styles.thirdSquareMargin)} checked={onlyWithPhoto} onChange={(e) => handleCheckboxChange('onlyWithPhoto', e.target.checked)} />
        </div>
      </div>

      <button type="submit" className={styles.applyPanel}>
        <svg className={styles.applyPanelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span className={styles.applyPanelText}>{t('filterPanel.applyFilters')}</span>
      </button>
    </form>
  );
};
