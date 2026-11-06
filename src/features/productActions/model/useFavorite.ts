import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '@/shared/lib';

const FAVORITES_COOKIE_KEY = 'iceberg_favorites';
const COOKIE_EXPIRES_DAYS = 365;

export const useFavorite = (productId: string) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Проверяем наличие товара в куках при монтировании компонента
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

  // Функция добавления / удаления
  const toggleFavorite = () => {
    const rawFavorites = getCookie(FAVORITES_COOKIE_KEY);
    let favoritesArray: string[] = [];

    if (rawFavorites) {
      try {
        favoritesArray = JSON.parse(rawFavorites);
      } catch {
        favoritesArray = [];
      }
    }

    let updatedFavorites: string[];

    if (favoritesArray.includes(productId)) {
      // Если уже есть — удаляем из массива
      updatedFavorites = favoritesArray.filter((id) => id !== productId);
      setIsFavorite(false);
    } else {
      // Если нет — добавляем в массив
      updatedFavorites = [...favoritesArray, productId];
      setIsFavorite(true);
    }

    // Сохраняем обновленный массив обратно в куки, превратив его в строку
    setCookie(FAVORITES_COOKIE_KEY, JSON.stringify(updatedFavorites), {
      expires: COOKIE_EXPIRES_DAYS,
      path: '/', // Чтобы кука была доступна на всех страницах сайта
    });
  };

  return { isFavorite, toggleFavorite };
};
