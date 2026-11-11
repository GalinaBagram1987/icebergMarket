import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';

export type ProductPageCollectorProps = {
  t: (key: string, options?: Record<string, any>) => string;
  productData: PostDetailResponse;
};

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
//     adress: {
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
//   adress: {
//     city: string;
//     street: string;
//     house: string;
//   };
// };
