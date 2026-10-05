export type FilterValues = {
  priceFrom: string;
  priceTo: string;
  isNew: boolean;
  isOld: boolean;
  onleByPhoto: boolean;
};

export type FilterPanelProps = {
  values: FilterValues;
  onChange: (newValues: FilterValues) => void;
  onSubmit: () => void;
};
