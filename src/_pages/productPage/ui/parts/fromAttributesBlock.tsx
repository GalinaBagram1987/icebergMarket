import styles from './parts.module.css';
import { Fragment } from 'react';

/**
 * Типы к полю атрибуты
 */

export type ProductAttributesProps = {
  attributes: any[] | null;
};

/**
 * Поле с атрибутами и их начением на странице товара
 */

export const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  if (!Array.isArray(attributes) || attributes.length === 0) {
    return null;
  }

  const normalizedPairs: [string, string][] = attributes.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];

    // Формат 1: { name/title/key: "Состояние", value: "Новый" }
    const label = item.name ?? item.title ?? item.key;
    if (label && item.value !== undefined && item.value !== null) {
      const valStr = Array.isArray(item.value) ? item.value.join(', ') : String(item.value);
      return valStr.trim() ? [[String(label), valStr]] : [];
    }

    // Формат 2: { "Состояние": "Новый" }
    return Object.entries(item)
      .filter(([, val]) => val !== null && val !== undefined && String(val).trim() !== '')
      .map(([key, val]) => [key, Array.isArray(val) ? val.join(', ') : String(val)] as [string, string]);
  });

  if (normalizedPairs.length === 0) {
    return null;
  }

  return (
    <div className={styles.attributesSection}>
      <div className={styles.divider}></div>

      <dl className={styles.attributeList}>
        {normalizedPairs.map(([label, value], index) => (
          <Fragment key={`${label}-${index}`}>
            <dt className={styles.attributeLabel}>{label}:</dt>
            <dd className={styles.attributeValue}>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <div className={styles.divider}></div>
    </div>
  );
};
