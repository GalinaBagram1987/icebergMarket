import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib';
import styles from './actionButton.module.css';
/**
 * Тип для UI кнопки-действия в компоненте страницы
 */

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
}

/**
 * UI одной кнопки-действия для компонента страницы
 */

export const ActionButton = ({ children, isActive = false, ...props }: ActionButtonProps) => {
  return (
    <button className={cn(styles.button, isActive && styles.active)} {...props}>
      {children}
    </button>
  );
};
