'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  minRows?: number;
  maxRows?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    fullWidth = true,
    resize = 'vertical',
    minRows = 3,
    maxRows,
    disabled,
    ...props 
  }, ref) => {
    const generatedId = useId();
    const textAreaId = props.id || generatedId;
    
    const baseTextAreaStyles = [
      // Base styles - mobile-first design
      'flex w-full rounded-lg border px-4 py-3 text-base',
      'bg-white transition-colors duration-200',
      'placeholder:text-gray-400',
      // Focus states with proper accessibility
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
      // Mobile-optimized text sizing (16px+ to prevent zoom on iOS)
      'text-base md:text-sm',
      // Touch-friendly sizing - minimum height based on minRows
      'min-h-[72px]', // ~3 rows at 24px line height
      // Disabled states
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
      // Font family for consistency
      'font-sans',
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

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x', 
      both: 'resize',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    // Calculate height based on rows
    const getMinHeight = () => {
      const baseHeight = 48; // Base padding and border
      const lineHeight = 24; // Approximate line height for text-base
      return baseHeight + (lineHeight * minRows);
    };

    const getMaxHeight = () => {
      if (!maxRows) return undefined;
      const baseHeight = 48;
      const lineHeight = 24;
      return baseHeight + (lineHeight * maxRows);
    };

    const heightStyles = {
      minHeight: `${getMinHeight()}px`,
      ...(maxRows && { maxHeight: `${getMaxHeight()}px` }),
    };

    return (
      <div className={cn('space-y-1', widthStyles)}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={textAreaId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </label>
        )}

        {/* TextArea */}
        <textarea
          {...props}
          ref={ref}
          id={textAreaId}
          className={cn(
            baseTextAreaStyles,
            stateStyles,
            resizeStyles[resize],
            className
          )}
          style={heightStyles}
          disabled={disabled}
          // Mobile optimizations
          autoCapitalize={props.autoCapitalize}
          autoCorrect={props.autoCorrect}
          spellCheck={props.spellCheck}
        />

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

TextArea.displayName = 'TextArea';

export { TextArea, type TextAreaProps };
