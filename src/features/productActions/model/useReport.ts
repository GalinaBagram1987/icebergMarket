import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

/**
 * Пропсы для отправки отчета
 */

export type UseReportProductProps = {
  productId: string;
};

/**
 * Хук для отправки отчета на странице товара
 */
export const useReportProduct = ({ productId }: UseReportProductProps) => {
  const t = useTranslations('icebergMarket'); // клиентский перевод
  const [isOpen, setIsOpen] = useState<boolean>(false); // Показ всего блока жалобы
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Показ выпадашки причин
  const [isSending, setIsSending] = useState<boolean>(false); // Процесс отправки
  const [reason, setReason] = useState<string>(''); // Выбранная причина

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => {
    if (isSending) return;
    setIsOpen(false);
    setIsDropdownOpen(false);
    setReason('');
  };

  const toggleDropdown = () => {
    if (isSending) return;
    setIsDropdownOpen((prev) => !prev);
  };

  const selectReason = (value: string) => {
    setReason(value);
    setIsDropdownOpen(false); // Закрываем выпадашку после выбора
  };

  const sendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    setIsSending(true);

    try {
      // Передаем fetch-запрос напрямую в toast.promise как первый аргумент
      await toast.promise(
        // запрос к бэку
        (async () => {
          // ПОка имитация. потом поставить реальный запрос
          await new Promise((resolve) => setTimeout(resolve, 2000));

          /* 
        // Когда появится реальный бэкенд, код будет таким:
        const res = await fetch(`/api/v1/posts/report-post`, { method: 'POST' });
        if (!res.ok) {
          throw new Error(t('productPage.reportError'));
        }
        */
        })(), // здесь возвращаем чистый Promise, который слушает библиотека

        // Настройки отображения тоста
        {
          loading: t('productPage.reportSending'),
          success: t('productPage.reportSuccessPartOne'),
          error: (err) => err.message || t('productPage.reportError'),
        },
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log(`${t('productPage.reportSuccessPartOne')} ${productId} ${t('productPage.reportSuccessPartTwo')} ${reason}`);
      closeDialog();
    } catch (error) {
      console.error(error);
      alert(t('productPage.reportError') + error);
    } finally {
      setIsSending(false);
    }
  };

  return {
    isOpen,
    isDropdownOpen,
    isSending,
    reason,
    openDialog,
    closeDialog,
    toggleDropdown,
    selectReason,
    sendReport,
  };
};
