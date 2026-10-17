import styles from './postCard.module.css';
import type { PostItemProps } from '../model/types';
import { formatPostDate } from '@/entities/lib';

export const PostCard = ({ post }: { post: PostItemProps }) => {
  const curPostDate = formatPostDate(post.date);

  return (
    <article className={styles.postGrid}>
      <img src={post.title_image} loading="lazy" alt={`картинка для ${post.title}`} className={styles.postImg} />
      <div className={styles.prodDescriptionBlock}>
        <h2 className={styles.postTitle}>{post.title}</h2>
        <p className={styles.postText}>{post.description}</p>
      </div>
      <div className={styles.infoBlock}>
        <p className={styles.price}>{post.price.toLocaleString('ru-RU')}p.</p>
        <p className={styles.authorName}>{post.author_name}</p>
        <p className={styles.date}>{curPostDate}</p>
        <p className={styles.views}>{post.views}</p>
      </div>
    </article>
  );
};
