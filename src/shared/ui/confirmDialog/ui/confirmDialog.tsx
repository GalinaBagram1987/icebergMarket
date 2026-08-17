'use client';
import { useId } from 'react';
import { useTranslations } from 'next-intl';
import styles from './confirmDialog.module.css';
import { ConfirmDialogProps } from '../module/types';

/**
 * Компонент диалог согласия
 * будет принимать функции в зависмости от компонента
 * в котором он будет использоваться
 */

export const ConfirmDialog = ({ isOpen, onConfirm, onCancel }: ConfirmDialogProps) => {
  const t = useTranslations('icebergMarket');
  const confirmTitleId = useId();
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.confirmDialog} role="dialog" aria-modal="true" aria-labelledby={confirmTitleId}>
      <p id={confirmTitleId} className={styles.confirmTitle}>
        {t('confirmDialog.confirmTitle')}
      </p>
      <div className={styles.confBtnGroup}>
        <button type="button" className={styles.confirmBtnOk} onClick={onConfirm}>
          {t('confirmDialog.ok')}
        </button>
        <button type="button" className={styles.confirmBtnCancel} onClick={onCancel}>
          {t('confirmDialog.cancel')}
        </button>
      </div>
    </div>
  );
};
