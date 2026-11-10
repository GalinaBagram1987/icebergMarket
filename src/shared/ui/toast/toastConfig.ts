import { DefaultToastOptions } from 'react-hot-toast';
import styles from './toast.module.css';

/**
 * Найстройки библиотеки тостов
 */

export const icebergToastConfig: DefaultToastOptions = {
  duration: 1000,
  className: styles.toastRoot,
  success: {
    className: `${styles.toastRoot} ${styles.toastSuccess}`,
    icon: '✅',
  },
  error: {
    className: `${styles.toastRoot} ${styles.toastError}`,
    icon: '❌',
  },
};
