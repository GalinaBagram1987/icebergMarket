'use client';
import type { ButtonHTMLAttributes } from 'react';
import { useState } from 'react';
import styles from './showPhoneButton.module.css';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib';

/**
 * Пропсы для кнопки показа телефона
 */
export type ShowButtonPhoneProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  phone: string;
  className?: string;
};

/**
 * Кнопка "Показать телефон".
 * При клике скрывает текст заглушки и отображает реальный номер.
 */

export const ShowButtonPhone = ({ phone, ...rest }: ShowButtonPhoneProps) => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <button type="button" onClick={handleClick} className={cn(styles.phoneBtn, isClicked ? styles.clicked : '')}>
      {isClicked ? phone : t('productPage.showPhone')}
    </button>
  );
};
