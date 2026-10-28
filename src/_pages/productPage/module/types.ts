import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';

export type ProductPageCollectorProps = {
  t: (key: string) => string;
  productData: PostDetailResponse;
};

// post_id: string;
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
//   } | null;
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
//   coordinates: [number, number] | null;
//   title_image: string;
//   is_favourite: string;
