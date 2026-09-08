import { SubCategoryErrorProps } from '../model/types';

/**
 * Компонент ошибки загрузки подкатегорий
 */

export const SubCategoryError = ({ error, reset }: SubCategoryErrorProps) => {
  return (
    <div>
      <h3>
        Упс! Произошла ошибка загрузки категорий.
        <br />
      </h3>
      <button onClick={reset} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}>
        Повторить попытку
      </button>
    </div>
  );
};
