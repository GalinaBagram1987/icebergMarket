'use client';

import { ActionButton } from '@/shared/ui/actionButton';
import { useFavorite } from '../model/useFavorite';
import { FaRegStar } from 'react-icons/fa';
/**
 * Тип для кнопки favorite
 */

export type FavoriteButtonProps = {
  productId: string;
  t: (key: string, options?: Record<string, any>) => string;
};

/**
 * кнопка добавить и удалить избранное в карточке товара
 */

export const FavoriteButton = ({ productId, t }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorite(productId);

  return (
    <ActionButton isActive={isFavorite} onClick={toggleFavorite} type="button">
      {isFavorite ? (
        <>
          <FaRegStar />
          {t('productPage.inFavorites')}
        </>
      ) : (
        <>
          <FaRegStar />
          {t('productPage.addFavorites')}
        </>
      )}
    </ActionButton>
  );
};
