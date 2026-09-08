import type { SubCategoryLoadingProps } from '../model/types';

/**
 * Компонент загрузки подкатегорий
 */

export const SubCategoryLoad = ({ load = 'Загрузка...' }: SubCategoryLoadingProps) => {
  return (
    <div>
      <p>{load}</p>
    </div>
  );
};
