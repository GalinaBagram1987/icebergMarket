/**
 * Общий тип для всех функций поиска
 */

export type SearchProps = {
  onSearch: (query: string) => void | Promise<void>;
  defaultValue?: string;
  placeholder?: string;
};
