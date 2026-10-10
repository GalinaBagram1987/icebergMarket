import styles from './filterPanel.module.css';
import type { FilterPanelProps, FilterValues } from './filterPanel.types';
import type { FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib';
/**
 * Компонент фильтрации
 * Нужен для фильтрации по подкаталогу
 * и фильтрации в поиске по карте
 */

export const FilterPanel = ({ values, onChange, onSubmit }: FilterPanelProps) => {
  const t = useTranslations('icebergMarket'); // Хук для клиента

  const handleInputChange = (field: keyof FilterValues, value: any) => {
    onChange({ ...values, [field]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form className={styles.wrapper} onSubmit={handleFormSubmit}>
      <div className={styles.filterPanel}>
        <div className={styles.priceFilter}>
          <span className={cn(styles.filterHead, styles.filterHeadPrice)}>{t('filterPanel.price')}</span>
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.priceFrom')}</span>
          <input type="text" className={cn(styles.priceInputFirst, styles.priceInputFirstMargin)} value={values.priceFrom} onChange={(e) => handleInputChange('priceFrom', e.target.value)} />
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.priceTo')}</span>
          <input type="text" className={cn(styles.priceInputSecond, styles.priceInputSecondMargin)} value={values.priceTo} onChange={(e) => handleInputChange('priceTo', e.target.value)} />
        </div>

        <div className={styles.stateFilter}>
          <span className={cn(styles.filterHead, styles.filterHeadState)}>{t('filterPanel.productState')}</span>
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.productStateNew')}</span>
          <input type="checkbox" checked={values.isNew} onChange={(e) => handleInputChange('isNew', e.target.checked)} className={cn(styles.squareInput, styles.firstSquareMargin)}></input>
          <span className={cn(styles.filterParamsText)}>{t('filterPanel.productStateUsed')}</span>
          <input type="checkbox" checked={values.isUsed} onChange={(e) => handleInputChange('isUsed', e.target.checked)} className={cn(styles.squareInput, styles.secondSquareMargin)}></input>
        </div>

        <div className={styles.onlyPhotoFilter}>
          <span className={cn(styles.filterHead, styles.filterHeadPhoto)}>{t('filterPanel.onlyWithPhoto')}</span>
          <input type="checkbox" className={cn(styles.squareInput, styles.thirdSquareMargin)} checked={values.onlyWithPhoto} onChange={(e) => handleInputChange('onlyWithPhoto', e.target.checked)} />
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
