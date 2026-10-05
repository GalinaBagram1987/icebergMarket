import styles from './filterPanel.module.css';
import type { FilterPanelProps, FilterValues } from '../module/types';

export const filterPanel = ({ values, onChange, onSubmit }: FilterPanelProps) => {
  const handleInputChange = (field: keyof FilterValues, value: any) => {
    onChange({ ...values, [field]: value });
  return (
    <div className={styles.wrapper} >
      
    </div>
  )

};
