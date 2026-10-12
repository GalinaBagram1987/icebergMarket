export type SearchModeType = 'global' | 'section';

export const parseMode = (modeValue: string | null | undefined): SearchModeType => {
  if (modeValue === 'section' || modeValue === 'global') {
    return modeValue;
  }
  return 'global';
};
