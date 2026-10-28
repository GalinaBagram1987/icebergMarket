import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';

export type ProductPageCollectorProps = {
  t: (key: string) => string;
  productData: PostDetailResponse;
};

// post_id: string;
//   title: string;
//   author_id: string;
//   author: any; // Специфичный JSON автора
//   description: string;
//   images: string;
//   directory_name: string;
//   posted_at: string;
//   category_id: number;
//   price_list_name: string;
//   coordinates: string; // POINT гео-координаты
//   title_image: string;
//   is_favourite: boolean;
