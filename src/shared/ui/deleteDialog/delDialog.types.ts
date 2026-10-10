/**
 * Пропсы для модального окна удаления.
 * Основные открыта или закрыта,
 * передаваемые функциидля каждого отдельного компонента
 */

export type DelDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
