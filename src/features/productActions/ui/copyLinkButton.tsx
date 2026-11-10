'use client';

import { useTranslations } from 'next-intl';
import { ActionButton } from '@/shared/ui/actionButton';
import { toast } from 'react-hot-toast';

/**
 * кнопка коприровать ссылку
 */

export const CopyLinkButton = () => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
  const handleCopy = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success(t('productPage.copyLinkReport'));
    } catch (error) {
      console.error('Ошибка при копировании ссылки:', error);
      toast.error(t('productPage.copyLinkError'));
    }
  };
  return (
    <ActionButton type="button" onClick={handleCopy}>
      {t('productPage.copyLinkText')}
    </ActionButton>
  );
};
