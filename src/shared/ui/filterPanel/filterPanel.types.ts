export type FilterValues = {
  priceFrom: string;
  priceTo: string;
  isNew: boolean;
  isUsed: boolean;
  onlyWithPhoto: boolean;
};

export type FilterPanelProps = {
  values: FilterValues;
  onChange: (newValues: FilterValues) => void;
  onSubmit: () => void;
};
