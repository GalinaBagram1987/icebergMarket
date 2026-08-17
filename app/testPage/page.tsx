'use client';

/**
 * Страница созданна временно
 * для просмотра внешнего вида компонентов
 * проверка на правильность отрисовки
 */

import { useState } from 'react';
import { ConfirmDialog } from '@/shared/ui/confirmDialog';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main>
      <div className="containerTest">
        <div>
          {/*Проверка как выглядит окно диалога */}

          <ConfirmDialog
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
