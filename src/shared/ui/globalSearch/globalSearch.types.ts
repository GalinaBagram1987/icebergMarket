export type GlobalSearchProps = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
};
