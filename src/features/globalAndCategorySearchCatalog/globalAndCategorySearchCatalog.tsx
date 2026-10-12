import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { GlobalAndCategorySearch } from '@/shared/ui/globalAndCategorySearch/globalAndCategorySearch';
import { parseMode, type SearchModeType } from './lib/parseMode';

export const GlobalAndCategorySearchCatalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [text, setText] = useState(searchParams.get('q') || '');
  const [mode, setMode] = useState<'section' | 'global'>(parseMode(searchParams.get('searchMode')));

  // при создании функции сохраняем предыдущие параметры
  const handleSubmit = () => {
    if (!text.trim()) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', text);
    params.set('searchMode', mode);
    router.replace(`${pathname}?${params.toString()}`); // при назад переходим на главную
    // router.push(`${pathname}?${params.toString()}`) // при назад переходим к прошлым результатам поиска
  };

  return <GlobalAndCategorySearch value={text} searchMode={mode} onChange={setText} onModeChange={setMode} onSubmit={handleSubmit} />;
};
