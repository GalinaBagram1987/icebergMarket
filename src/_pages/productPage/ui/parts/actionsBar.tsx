import { DeleteButton } from '@/features/productActions';
import { ReportButton } from '@/features/productActions';
import { FavoriteButton } from '@/features/productActions';
import { CopyLinkButton } from '@/features/productActions';
import styles from './parts.module.css';
import { useTranslations } from 'next-intl';

/**
 * Пропсы к бару-действию
 */

export type ActionBarProps = {
  productId: string;
};

/**
 * ActionBar на странице продукта
 */

export const ActionBar = ({ productId }: ActionBarProps) => {
  // клиентский компонент
  const t = useTranslations('icebergMarket');

  return (
    <div className={styles.actionBarBtnGroup}>
      <FavoriteButton productId={productId} />
      <CopyLinkButton />
      <DeleteButton productId={productId} />
      <ReportButton productId={productId} />
    </div>
  );
};
