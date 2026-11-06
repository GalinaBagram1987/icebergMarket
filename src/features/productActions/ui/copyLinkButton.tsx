'use client';

import { ActionButton } from '@/shared/ui/actionButton';

/**
 * Тип для кнопки copyLink
 */

export type CopyLinkProps = {
  t: (key: string, options?: Record<string, any>) => string;
};

/**
 * кнопка коприровать ссылку
 */

export const copyLink = ({ t }: CopyLinkProps) => {
  const handleCopy = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert(t('productPage.copyLinkSuccess'));
    } catch (error) {
      console.error('Ошибка при копировании ссылки:', error);
    }
  };
  return (
    <ActionButton type="button" onClick={handleCopy}>
      {t('productPage.copyLinkText')}
    </ActionButton>
  );
};
