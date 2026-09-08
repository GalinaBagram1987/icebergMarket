'use client';
import { CategoryError } from '@/_pages/category';

/**
 * Интерфейс свойств (пропсов), которые автоматически передаёт Next.js в Error Boundary.
 * содержит
 * Объект ошибки, содержащий сообщение и уникальный системный digest сбоя
 *  Функция для сброса состояния роута и повторной попытки загрузки данных
 */

interface CategoryAppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Системный клиентский роутер для перехвата и обработки ошибок в каталоге категорий первого уровня.
 *
 * Компонент автоматически активируется Next.js (Error Boundary), если в процессе
 * серверного рендеринга, генерации метаданных или работы клиентских компонентов
 * произошел критический сбой (например, ошибка 502 Bad Gateway от бэкенда).
 *
 * @param props - Свойства, автоматически передаваемые архитектурой Next.js App Router.
 * @returns Визуальный FSD-компонент экрана ошибки из слоя _pages.
 */

const CategoryErrorPage = ({ error, reset }: CategoryAppErrorProps) => {
  return <CategoryError error={error} reset={reset} />;
};

export default CategoryErrorPage;
