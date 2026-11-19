import styles from './parts.module.css';
import { ShowButtonPhone } from '@/features/showPhoneButton';
import { formatToYear } from '@/shared/lib';

/**
 * Тип для информации про компнанию
 */

export type SecondCompanyInfoProps = {
  image?: string;
  productSeller: string;
  date_created: string;
  address: {
    city: string;
    street: string;
    house: string;
  };
  telephone: string;
};

/**
 * Информация про компанию
 */

const PLACEHOLDER_IMAGE = '/img/noPhoto.jpg';

export const SecondCompanyInfo = ({ image, productSeller, date_created, address, telephone }: SecondCompanyInfoProps) => {
  const streetLine = `${address.street} ${address.house} `;

  // const trimmedImage = image?.trim();

  return (
    <div className={styles.secondCompanyWrapper}>
      <img src={image} alt={`Логотип ${productSeller}`} className={styles.logoSecondComp} />

      <p className={styles.nameSecondComp}>{productSeller}</p>
      <p className={styles.dateCreate}>На сайте с {formatToYear(date_created)}</p>
      <p className={styles.citySecondComp}>{address.city}</p>
      <p className={styles.addressSecondComp}>{streetLine}</p>
      <ShowButtonPhone phone={telephone} />
    </div>
  );
};
