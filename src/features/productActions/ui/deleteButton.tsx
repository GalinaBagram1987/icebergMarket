'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ActionButton } from '@/shared/ui/actionButton';
import { DelDialog } from '@/shared/ui/deleteDialog';
import { useDeleteProduct } from '../model/useDeleteProduct';
import styles from './deleteButton.module.css';
import { useClickOutside } from '@/shared/lib';

/**
 * Тип для кнопки delete Button
 */

export type DeleteButtonProps = {
  productId: string;
};

/**
 * кнопка удалить товар
 */

export const DeleteButton = ({ productId }: DeleteButtonProps) => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
  const { isOpen, isDeleting, openDialog, closeDialog, confirmDelete } = useDeleteProduct({ productId, t });

  const containerRef = useRef<HTMLDivElement>(null);

  // отслеживание клика вне элемента
  useClickOutside(containerRef, closeDialog, isOpen);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <ActionButton disabled={isDeleting} type="button" onClick={isOpen ? closeDialog : openDialog}>
        {t('productPage.delete')}
      </ActionButton>
      <div className={styles.dialogDropdown}>
        <DelDialog isOpen={isOpen} onConfirm={confirmDelete} onCancel={closeDialog} />
      </div>
    </div>
  );
};
