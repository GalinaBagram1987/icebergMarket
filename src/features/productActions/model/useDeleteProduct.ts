import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

/**
 * Типы хука удаления
 */

export type useDeleteProductProps = {
  productId: string;
  t: (key: string, options?: Record<string, any>) => string;
};

/**
 * Хук удаления товара.
 * Кнопка удалить расположена на странице товара
 */

export const useDeleteProduct = ({ productId }: useDeleteProductProps) => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    if (isDeleting) return; // Не даем закрыть окно, пока идет удаление
    setIsOpen(false);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    alert(t('productPage.deleteProcess'));
    try {
      // Имитация запроса к бэкенду
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(`${productId} ${t('productPage.deleteReport')}`);
      alert(`${productId} ${t('productPage.deleteReport')}`);

      setIsOpen(false);
      router.push('/');
      // router.push('/profile'); редирект профиль
    } catch (error) {
      console.error(t('productPage.deleteError'), error);
      alert(t('productPage.deleteError') + error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isOpen,
    isDeleting,
    openDialog,
    closeDialog,
    confirmDelete,
  };
};
