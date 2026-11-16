import styles from './parts.module.css';

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
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className={styles.descriptionWrapper}>
      {lines.map((line, index) => (
        <p key={index} className={styles.descriptionLine}>
          {line}
        </p>
      ))}
      <div className={styles.divider}></div>
    </div>
  );
};
