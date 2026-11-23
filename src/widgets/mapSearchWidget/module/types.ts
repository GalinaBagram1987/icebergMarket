import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';
import type { SearchGetResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Состояния показа карты
 *
 * map - Состояние А: чистая карта
 * list - Состояние Б: карта + список справа
 * product  - Состояние В: карта + карточка товара справа
 */

export type MapDrawerState = { mode: 'map' } | { mode: 'list' } | { mode: 'product'; productId: string | number };

/**
 * Входящие типы поиска по карте
 */

export type MapSearchWidgetProps = {
  // Принимаем весь ответ бэка
  initialSearchData: SearchGetResponse;

  // Колбэк для закрытия (возврат на страницу)
  onCloseMap?: () => void;

  className?: string;
};

// export type SearchGetResponse = {
//   count: number;
//   categories: {
//     [key: string]: {
//       id: number;
//       name: string;
//       slug: string;
//       path: string;
//       count: number;
//     };
//   };
//   posts: {
//     id: string;
//     title: string;
//     price: string | number;
//     date: string;
//     title_image: string;
//     category_id: number;
//     description: string;
//     author_id: string;
//     author_name: string;
//     author_image: string;
//     attributes: BackendAttributes;
//     views: number | string;
//     address: string | null; // in this string back return "city/street/house"
//   }[];
// };

// export type PostDetailResponse = {
//   post_id: string;
//   views: number;
//   price: number;
//   title: string;
//   author_id: string;
//   author: {
//     id: string;
//     name: string;
//     email: string;
//     image: string;
//     date_created: string;
//     full_name: string;
//     telephone: string;
//     description: string;
//     delivery_description: string;
//     address: {
//       city: string;
//       street: string;
//       house: string;
//     };
//   };
//   attributes: any[];
//   description: string;
//   breadcrumbs: {
//     id: number;
//     name: string;
//     slug: string;
//   }[];
//   images: string[];
//   directory_name: string;
//   posted_at: string;
//   category_id: number;
//   price_list_name: string;
//   title_image: string;
//   is_favourite: boolean;
//   address: {
//     city: string;
//     street: string;
//     house: string;
//   };
// };
