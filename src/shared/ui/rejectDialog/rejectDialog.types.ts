/**
 * Пропсы для диалога отказа.
 * Основные открыта или закрыта,
 * передаваемые функции для каждого отдельного компонента
 */

export type RejectDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
