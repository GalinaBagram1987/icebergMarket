'use client';

import { useTranslations } from 'next-intl';
import { ActionButton } from '@/shared/ui/actionButton';

/**
 * кнопка коприровать ссылку
 */

export const CopyLinkButton = () => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
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
