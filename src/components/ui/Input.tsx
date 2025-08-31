'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = true,
    disabled,
    ...props 
  }, ref) => {
    const generatedId = useId();
    const inputId = props.id || generatedId;
    
    const baseInputStyles = [
      // Base styles - mobile-first design
      'flex h-12 w-full rounded-lg border px-4 py-3 text-base',
      'bg-white transition-colors duration-200',
      'placeholder:text-gray-400',
      // Focus states with proper accessibility
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
      // Mobile-optimized text sizing (16px+ to prevent zoom on iOS)
      'text-base md:text-sm',
      // Touch-friendly sizing
      'min-h-[48px]',
      // Disabled states
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    ];

    const stateStyles = error 
      ? [
          'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-500',
          'bg-red-50/30',
        ]
      : [
          'border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500',
          'hover:border-gray-300',
        ];

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={cn('space-y-1', widthStyles)}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <div className="text-gray-400 w-4 h-4">
                {leftIcon}
              </div>
            </div>
          )}

          {/* Input Field */}
          <input
            {...props}
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              baseInputStyles,
              stateStyles,
              {
                'pl-12': leftIcon, // Add left padding when icon present
                'pr-12': rightIcon, // Add right padding when icon present
              },
              className
            )}
            disabled={disabled}
            // Mobile optimizations
            autoComplete={props.autoComplete || 'off'}
            autoCapitalize={type === 'email' ? 'none' : props.autoCapitalize}
            autoCorrect={type === 'email' ? 'off' : props.autoCorrect}
            spellCheck={type === 'email' || type === 'number' ? false : props.spellCheck}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <div className="text-gray-400 w-4 h-4">
                {rightIcon}
              </div>
            </div>
          )}
        </div>

        {/* Helper Text or Error */}
        {(error || helperText) && (
          <p 
            className={cn(
              'text-sm',
              error ? 'text-red-600' : 'text-gray-500'
            )}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, type InputProps };
