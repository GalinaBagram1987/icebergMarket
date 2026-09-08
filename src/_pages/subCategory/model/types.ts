/**
 * Пропсы для основного компонента подкатегории
 */

export type SubCategoryPageProps = {
  path: string;
};

/**
 * Интерфейс ошибки подкатегории для пропросов, которые придут от next.js
 */

export interface SubCategoryErrorProps {
  error: Error & { digest?: string };
  reset: () => void; // Колбэк для кнопки повтора запроса
}

/**
 * Интерфейс загрузки подкатегории для пропросов, которые придут от next.js
 */

export interface SubCategoryLoadingProps {
  load?: string;
}
