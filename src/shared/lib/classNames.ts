import { clsx, type ClassValue } from 'clsx';

//кастомный хелпер cn
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
