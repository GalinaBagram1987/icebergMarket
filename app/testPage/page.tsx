'use client';

/**
 * Страница созданна временно
 * для просмотра внешнего вида компонентов
 * проверка на правильность отрисовки
 */

import { useState } from 'react';
import { ConfirmDialog } from '@/shared/ui/confirmDialog';
import { RejectDialog } from '@/shared/ui/rejectDialog';
import { DelDialog } from '@/shared/ui/deleteDialog';
import { SearchCategory } from '@/widgets/search/SearchCategory/ui/SearchCategory';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main>
      <div className="containerTest">
        <div>
          {/*Проверка как выглядит окно диалога согласия*/}

          <ConfirmDialog
            isOpen={isOpen}
            onConfirm={() => {
              console.log('Подтверждено');
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />
        </div>
        <div></div>
        <div>
          {/*Проверка как выглядит окно диалога отказа*/}

          <RejectDialog
            isOpen={isOpen}
            onConfirm={() => {
              console.log('Отклонено');
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />
        </div>
        <div></div>
        <div>
          {/*Проверка как выглядит окно диалога удалить*/}

          <DelDialog
            isOpen={isOpen}
            onConfirm={() => {
              console.log('Удалено');
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />
        </div>
        {/*Проверка как выглядит окно диалога удалить*/}
        <div style={{ marginTop: '20px' }}>
          <SearchCategory />
        </div>
      </div>
    </main>
  );
};

export default TestPage;
