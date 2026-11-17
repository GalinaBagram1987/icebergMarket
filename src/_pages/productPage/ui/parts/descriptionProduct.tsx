import styles from './parts.module.css';
import { cn } from '@/shared/lib';

/**
 * Типы к полю описание
 */

export type ProductDescriptionProps = {
  description?: string | null;
};

/**
 * Поле описание
 */

export const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description || !description.trim()) {
    return null;
  }

  const lines = description
    .split('.')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className={styles.descriptionWrapper}>
      {lines.map((line, index) => (
        <p key={index} className={styles.descriptionLine}>
          {line}
        </p>
      ))}
      <div className={cn(styles.divider, styles.marginClass)}></div>
    </div>
  );
};
