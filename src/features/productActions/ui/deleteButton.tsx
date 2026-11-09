'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ActionButton } from '@/shared/ui/actionButton';
import { DelDialog } from '@/shared/ui/deleteDialog';
import { useDeleteProduct } from '../model/useDeleteProduct';
import styles from './deleteButton.module.css';

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
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, что кликнули именно вне нашего контейнера
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDialog();
      }
    };

    // Вешаем слушатель на весь документ
    document.addEventListener('mousedown', handleClickOutside);

    // Обязательно чистим за собой слушатель при размонтировании
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDialog]);

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
