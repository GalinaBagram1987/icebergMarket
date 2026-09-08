import type { CategoryLoadingProps } from '../model/types';

/**
 *Компонент загрузки страницы категории
 */

export const CategoryLoad = ({ load = 'Загрузка...' }: CategoryLoadingProps) => {
  return (
    <div>
      <p>{load}</p>
    </div>
  );
};
