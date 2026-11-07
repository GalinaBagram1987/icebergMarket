'use client';

import { ActionButton } from '@/shared/ui/actionButton';
import { DelDialog } from '@/shared/ui/deleteDialog';
import { useDeleteProduct } from '../model/useDeleteProduct';

/**
 * Тип для кнопки delete Button
 */

export type DeleteButtonProps = {
  productId: string;
  t: (key: string, options?: Record<string, any>) => string;
};

/**
 * кнопка удалить товар
 */

export const DeleteButton = ({ productId, t }: DeleteButtonProps) => {
  const { isOpen, isDeleting, openDialog, closeDialog, confirmDelete } = useDeleteProduct({ productId, t });
  return (
    <>
      <ActionButton disabled={isDeleting} type="button" onClick={openDialog}>
        {t('productPage.delete')}
      </ActionButton>
      <DelDialog isOpen={isOpen} onConfirm={confirmDelete} onCancel={closeDialog} />
    </>
  );
};
