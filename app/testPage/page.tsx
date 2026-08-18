'use client';

/**
 * Страница созданна временно
 * для просмотра внешнего вида компонентов
 * проверка на правильность отрисовки
 */

import { useState } from 'react';
import { ConfirmDialog } from '@/shared/ui/confirmDialog';
import { RejectDialog } from '@/shared/ui/rejectDialog';

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
        <div>
          {/*Проверка как выглядит окно диалога отказа*/}

          <RejectDialog
            isOpen={isOpen}
            onConfirm={() => {
              console.log('Подтверждено');
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />
        </div>
      </div>
    </main>
  );
};

export default TestPage;
