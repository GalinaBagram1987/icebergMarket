import type { PostItemProps, PostsListProps } from '../model/types';
import styles from './postsList.module.css';
import { PostCard } from './postCard';

export const PostList = ({ postsData }: { postsData: PostsListProps }) => {
  const actualPosts = postsData.postList;
  return (
    <ul className={styles.ulStyle}>
      {actualPosts.map((postItem: PostItemProps) => (
        <li key={postItem.id} className={styles.liStyle}>
          <PostCard post={postItem} />
        </li>
      ))}
    </ul>
  );
};
