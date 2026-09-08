/**
 * Пропсы для основного компонента категории
 */

export type CategoryPageProps = {
  slug: string;
};

/**
 * Интерфейс ошибки для пропросов, которые придут от next.js
 */

export interface CategoryErrorProps {
  error: Error & { digest?: string };
  reset: () => void; // Колбэк для кнопки повтора запроса
}

/**
 * Интерфейс загрузки для пропросов, которые придут от next.js
 */

export interface CategoryLoadingProps {
  load?: string;
}
