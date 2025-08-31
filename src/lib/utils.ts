import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with clsx and merges Tailwind classes with tailwind-merge
 * This prevents conflicts like having both 'px-2' and 'px-4' in the same element
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
