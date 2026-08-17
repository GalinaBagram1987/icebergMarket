/**
 * Пропсы для диалога согласия.
 * Основные открыта или закрыта,
 * передаваемые функциидля каждого отдельного компонента
 */

export type ConfirmDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
