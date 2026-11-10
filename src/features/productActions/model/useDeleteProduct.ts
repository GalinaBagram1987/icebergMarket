import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

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
    try {
      // Передаем fetch-запрос напрямую в toast.promise как первый аргумент
      await toast.promise(
        // запрос к бэку
        (async () => {
          // ПОка имитация. потом поставить реальный запрос
          await new Promise((resolve) => setTimeout(resolve, 2000));

          /* 
        // Когда появится реальный бэкенд, код будет таким:
        const res = await fetch(`/api/v1/posts/${productId}`, { method: 'DELETE' });
        if (!res.ok) {
          throw new Error(t('productPage.deleteError'));
        }
        */
        })(), // здесь возвращаем чистый Promise, который слушает библиотека

        // Настройки отображения тоста
        {
          loading: t('productPage.deleteProcess'),
          success: t('productPage.deleteReport'),
          error: (err) => err.message || t('productPage.deleteError'),
        },
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log(`${t('productPage.deleteReport')} ${productId}`);
      closeDialog();
      router.push('/');
    } catch (error) {
      console.error(t('productPage.deleteError'), error);
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
