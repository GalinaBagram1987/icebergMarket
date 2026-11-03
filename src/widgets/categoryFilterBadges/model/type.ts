import type { SearchGetResponse } from '@/shared/api/apiMethods/catalog/type';

export type CategoryFilterBadgesProps = {
  categories: SearchGetResponse['categories'];
};

// categories: {
//     [key: string]: {
//       id: number;
//       name: string;
//       slug: string;
//       path: string;
//       count: number;
//     };
