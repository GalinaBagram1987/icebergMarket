'use client';
import { useId } from 'react';
import { useTranslations } from 'next-intl';
import styles from './delDialog.module.css';
import { DelDialogProps } from '../module/types';

/**
 * Компонент модальное окно удалить
 * будет принимать функции в зависмости от компонента
 * в котором он будет использоваться
 */

export const DelDialog = ({ isOpen, onConfirm, onCancel }: DelDialogProps) => {
  const t = useTranslations('icebergMarket');
  const delTitleId = useId();
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.delDialog} role="dialog" aria-modal="true" aria-labelledby={delTitleId}>
      <p id={delTitleId} className={styles.delTitle}>
        {t('deleteDialog.delTitle')}
      </p>
      <div className={styles.delBtnGroup}>
        <button type="button" className={styles.delBtnOk} onClick={onConfirm}>
          {t('deleteDialog.delete')}
        </button>
        <button type="button" className={styles.delBtnCancel} onClick={onCancel}>
          {t('deleteDialog.cancel')}
        </button>
      </div>
    </div>
  );
};
