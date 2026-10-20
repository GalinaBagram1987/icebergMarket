'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { GlobalSearch } from '@/shared/ui/globalSearch';

export const GlobalSearchCatalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [text, setText] = useState(searchParams.get('q') || '');

  // Если изменился URL (например, нажали "Назад"), обновляем текст в инпуте
  useEffect(() => {
    setText(searchParams.get('q') || '');
  }, [searchParams]);

  // при создании функции сохраняем предыдущие параметры
  const handleSubmit = () => {
    if (!text.trim()) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', text);
    params.set('page', '1');

    router.push(`/search?${params.toString()}`); // при назад переходим к прошлым результатам поиска
  };

  return <GlobalSearch value={text} onChange={setText} onSubmit={handleSubmit} />;
};
