'use client';

import { useTranslations } from 'next-intl';
import { ActionButton } from '@/shared/ui/actionButton';
import { DelDialog } from '@/shared/ui/deleteDialog';
import { useDeleteProduct } from '../model/useDeleteProduct';

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
  return (
    <>
      <ActionButton disabled={isDeleting} type="button" onClick={openDialog}>
        {t('productPage.delete')}
      </ActionButton>
      <DelDialog isOpen={isOpen} onConfirm={confirmDelete} onCancel={closeDialog} />
    </>
  );
};
