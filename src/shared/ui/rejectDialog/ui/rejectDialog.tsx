'use client';
import { useId } from 'react';
import { useTranslations } from 'next-intl';
import styles from './rejectDialog.module.css';
import { RejectDialogProps } from '../module/types';
import { cn } from '@/shared/lib';

/**
 * Компонент диалог согласия
 * будет принимать функции в зависмости от компонента
 * в котором он будет использоваться
 */

export const RejectDialog = ({ isOpen, onConfirm, onCancel }: RejectDialogProps) => {
  const t = useTranslations('icebergMarket');
  const rejectTitleId = useId();
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.rejectDialog} role="dialog" aria-modal="true" aria-labelledby={rejectTitleId}>
      <p id={rejectTitleId} className={styles.rejectTitle}>
        {t('confirmDialog.rejectTitle')}
      </p>
      <div className={styles.rejectBtnGroup}>
        <button type="button" className={styles.rejectBtnOk} onClick={onConfirm}>
          {t('confirmDialog.rejectBut')}
        </button>
        <button type="button" className={styles.rejectBtnCancel} onClick={onCancel}>
          {t('confirmDialog.cancel')}
        </button>
      </div>
    </div>
  );
};
