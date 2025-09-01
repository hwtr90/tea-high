'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'purple';
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  color = 'blue',
  helperText,
  error,
  required = false,
  className
}) => {
  const generatedId = useId();
  const switchId = id || generatedId;
  
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  
  const currentChecked = isControlled ? checked : internalChecked;
  
  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !currentChecked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  // Size styles
  const sizeStyles = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
      text: 'text-sm'
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
      text: 'text-base'
    },
    lg: {
      track: 'h-7 w-12',
      thumb: 'h-6 w-6',
      translate: 'translate-x-5',
      text: 'text-lg'
    }
  };

  // Color styles
  const colorStyles = {
    blue: currentChecked ? 'bg-blue-600' : 'bg-gray-200',
    green: currentChecked ? 'bg-green-600' : 'bg-gray-200',
    red: currentChecked ? 'bg-red-600' : 'bg-gray-200',
    purple: currentChecked ? 'bg-purple-600' : 'bg-gray-200'
  };

  const focusStyles = {
    blue: 'focus:ring-blue-500',
    green: 'focus:ring-green-500',
    red: 'focus:ring-red-500',
    purple: 'focus:ring-purple-500'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={switchId}
          className={cn(
            'block font-medium text-gray-700',
            sizeStyles[size].text,
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
      )}

      {/* Switch */}
      <div className="flex items-center">
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={currentChecked}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            // Base styles
            'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            // Size
            sizeStyles[size].track,
            // Color
            colorStyles[color],
            // Focus
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            focusStyles[color],
            // Disabled
            disabled && 'cursor-not-allowed opacity-50',
            // Error state
            error && 'ring-2 ring-red-500 ring-offset-2'
          )}
        >
          <span
            className={cn(
              // Base thumb styles
              'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
              // Size
              sizeStyles[size].thumb,
              // Position based on state
              currentChecked ? sizeStyles[size].translate : 'translate-x-0'
            )}
          />
        </button>

        {/* Optional inline label for compact layouts */}
        {!label && (
          <span className={cn(
            'ml-3 font-medium text-gray-700',
            sizeStyles[size].text,
            disabled && 'opacity-50'
          )}>
            {currentChecked ? 'On' : 'Off'}
          </span>
        )}
      </div>

      {/* Helper text */}
      {helperText && !error && (
        <p className="text-sm text-gray-600">
          {helperText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Switch;
