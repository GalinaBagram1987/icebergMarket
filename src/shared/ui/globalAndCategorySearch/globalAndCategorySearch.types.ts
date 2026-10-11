export type GlobalAndCategorySearchProps = {
  value: string;
  searchMode: 'section' | 'global';
  onChange: (text: string) => void;
  onModeChange: (mode: 'section' | 'global') => void;
  onSubmit: () => void;
  //
  placeholder?: string;
  isLoading?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
};
