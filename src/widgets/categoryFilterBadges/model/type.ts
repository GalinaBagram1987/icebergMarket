import type { SearchGetResponse } from '@/shared/api/apiMethods/catalog/type';

export type CategoryFilterBadgesProps = {
  categories: SearchGetResponse['categories'];
};

// export type CategoryBackendRequest = {
//   id: string;
//   name: string;
//   slug: string;
//   count: number; // Каунтер для серых плашек над выдачей
//   path: string;
// };
