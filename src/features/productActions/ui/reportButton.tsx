'use client';

import { useTranslations } from 'next-intl';
import { ActionButton } from '@/shared/ui/actionButton';
import { useReportProduct } from '../model/useReport';
import { FaChevronDown } from 'react-icons/fa'; // Стрелочка для селекта
import styles from './report.module.css';
import { cn } from '@/shared/lib';

/**
 * Тип для кнопки отправить отчет
 */

export type ReportButtonProps = {
  productId: string;
};

/**
 * кнопка отправить отчет
 */

export const ReportButton = ({ productId }: ReportButtonProps) => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
  const { isOpen, isDropdownOpen, isSending, reason, openDialog, closeDialog, toggleDropdown, selectReason, sendReport } = useReportProduct({ productId });

  const options = [
    { value: 'illegal', label: t('productPage.reportReasonIllegal') }, // Нарушает закон
    { value: 'rules', label: t('productPage.reportReasonRules') }, // Нарушает правила сайта
    { value: 'other', label: t('productPage.reportReasonOther') }, // Другое
  ];

  const currentLabel = options.find((opt) => opt.value === reason)?.label || '';

  return (
    <div className={styles.reportWrapper}>
      <ActionButton disabled={isSending} type="button" onClick={openDialog}>
        {t('productPage.report')}
      </ActionButton>
      {/* Блок согласия*/}
      {isOpen && (
        <div className={styles.reportModalCard}>
          <form className={styles.formStyles} onSubmit={sendReport}>
            <p className={cn(styles.formFont, styles.fontBlack, styles.headerMargin)}>{t('productPage.reportReasonHeader')}</p>
            {/* Контейнер кастомного селекта */}
            <div className={styles.selectContainer}>
              {/* Поле, по которому кликают */}
              <button type="button" className={styles.selectField} onClick={toggleDropdown} disabled={isSending}>
                <span className={cn(styles.selectedValue, styles.formFont, styles.fontBlack)}>{currentLabel}</span>
                <span className={cn(styles.arrowBox, isDropdownOpen && styles.arrowUp)}>
                  <FaChevronDown />
                </span>
              </button>

              {/* Раскрывающийся список опций */}
              {isDropdownOpen && (
                <ul className={styles.dropdownList} role="listbox">
                  {options.map((opt) => (
                    <li key={opt.value} role="option" aria-selected={reason === opt.value}>
                      <button type="button" className={styles.formFont} onClick={() => selectReason(opt.value)}>
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {/* Блок управляющих кнопок: Отправить Отменить */}
              <div className={styles.actionRow}>
                <button type="submit" className={cn(styles.submitBtn, styles.buttonFont, styles.fontBlack)} disabled={isSending || !reason}>
                  {isSending ? t('productPage.reportSend') : t('productPage.send')}
                </button>

                <button type="button" className={cn(styles.cancelBtn, styles.buttonFont, styles.fontWhite)} onClick={closeDialog} disabled={isSending}>
                  {t('productPage.reportCancel')}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
