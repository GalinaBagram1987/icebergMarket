import type { AttributeItem } from '@/shared/api/apiMethods/catalog/type';

export type PostItemProps = {
  id: string;
  title: string;
  price: number;
  title_image: string;
  category_id: number;
  author_id: string;
  author_name: string;
  author_image: string;
  attributes: AttributeItem[];
  date: number;
  views: number | string;
  description: string;
};

export type PostsListProps = {
  count?: number;
  posts: PostItemProps[];
};
