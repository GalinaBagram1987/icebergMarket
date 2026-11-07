'use client';

import { useTranslations } from 'next-intl';
import { ActionButton } from '@/shared/ui/actionButton';
import { useFavorite } from '../model/useFavorite';
import { FaRegStar } from 'react-icons/fa';
/**
 * Тип для кнопки favorite
 */

export type FavoriteButtonProps = {
  productId: string;
};

/**
 * кнопка добавить и удалить избранное в карточке товара
 */

export const FavoriteButton = ({ productId }: FavoriteButtonProps) => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
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
