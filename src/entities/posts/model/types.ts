export type PostItemProps = {
  id: string;
  title: string;
  price: number;
  title_image: string;
  category_id: number;
  author_id: string;
  author_name: string;
  author_image: string;
  attributes: string[];
  status?: 'new' | 'used';
};

export type PostsListProps = {
  count: number;
  posts: PostItemProps[];
};
