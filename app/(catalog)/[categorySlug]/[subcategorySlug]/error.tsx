'use client';

import { SubCategoryError } from '@/_pages/subCategory/ui/subcategoryErrorSkeleton';

/**
 * Интерфейс свойств (пропсов), которые автоматически передаёт Next.js в Error Boundary.
 * содержит
 * Объект ошибки, содержащий сообщение и уникальный системный digest сбоя
 *  Функция для сброса состояния роута и повторной попытки загрузки данных
 */

interface SubCategoryAppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const SubCategoryErrorPage = ({ error, reset }: SubCategoryAppErrorProps) => {
  return <SubCategoryError error={error} reset={reset} />;
};

export default SubCategoryErrorPage;
