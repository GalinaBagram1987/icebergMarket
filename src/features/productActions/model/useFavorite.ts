import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '@/shared/lib';

const FAVORITES_COOKIE_KEY = 'iceberg_favorites';
const COOKIE_EXPIRES_DAYS = 365;

export const useCookie = (productId: string) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const rawFavorites = getCookie(FAVORITES_COOKIE_KEY);

    if (rawFavorites) {
      try {
        const favoritesArray: string[] = JSON.parse(rawFavorites);
        setIsFavorite(favoritesArray.includes(productId));
      } catch {
        setIsFavorite(false); // Защита на случай битых данных в куках
      }
    }
  }, [productId]);
};
