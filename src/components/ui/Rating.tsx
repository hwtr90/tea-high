'use client';

import React, { useState, useId } from 'react';
import { cn } from '@/lib/utils';

interface RatingProps {
  id?: string;
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  maxRating?: number; // Default to 10 for Tea High
  showNumbers?: boolean; // Show numeric tick marks
  size?: 'sm' | 'md' | 'lg';
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({
    id,
    label,
    value,
    defaultValue = 0,
    onChange,
    error,
    helperText,
    disabled = false,
    required = false,
    fullWidth = true,
    maxRating = 10, // 10-point system for Tea High
    showNumbers = true,
    size = 'md',
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    
    const generatedId = useId();
    const ratingId = id || generatedId;

    const currentValue = value !== undefined ? value : internalValue;

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const newValue = parseInt(event.target.value, 10);
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const sizeStyles = {
      sm: {
        slider: 'h-1.5',
        thumb: 'h-4 w-4',
        container: 'py-2',
        text: 'text-xs',
      },
      md: {
        slider: 'h-2',
        thumb: 'h-5 w-5',
        container: 'py-3',
        text: 'text-sm',
      },
      lg: {
        slider: 'h-2.5',
        thumb: 'h-6 w-6',
        container: 'py-4',
        text: 'text-base',
      },
    };

    const widthStyles = fullWidth ? 'w-full' : '';
    const percentage = (currentValue / maxRating) * 100;

    return (
      <div className={cn('space-y-2', widthStyles)} ref={ref} {...props}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={ratingId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </label>
        )}

        {/* Slider Container */}
        <div 
          className={cn(
            'relative',
            sizeStyles[size].container,
            disabled && 'opacity-50'
          )}
        >
          {/* Custom Slider Track - Perfectly Centered */}
          <div className="relative flex items-center">
            {/* Background Track */}
            <div 
              className={cn(
                'w-full rounded-full bg-gray-200',
                sizeStyles[size].slider,
                error && 'bg-red-100'
              )}
            />
            
            {/* Progress Track */}
            <div 
              className={cn(
                'absolute rounded-full transition-all duration-200',
                sizeStyles[size].slider,
                currentValue > 0 
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                  : 'bg-gray-200'
              )}
              style={{ width: `${percentage}%` }}
            />

            {/* HTML Range Input - Perfectly Aligned */}
            <input
              id={ratingId}
              type="range"
              min="0"
              max={maxRating}
              value={currentValue}
              onChange={handleSliderChange}
              disabled={disabled}
              className={cn(
                // Reset all default styles and position absolutely
                'absolute inset-0 w-full appearance-none bg-transparent cursor-pointer',
                
                // Remove default track styling
                '[&::-webkit-slider-track]:appearance-none [&::-webkit-slider-track]:bg-transparent',
                '[&::-moz-range-track]:appearance-none [&::-moz-range-track]:bg-transparent',
                
                // Focus styles
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
                
                // Webkit thumb styles
                '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
                '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2',
                '[&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-lg',
                '[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200',
                '[&::-webkit-slider-thumb]:cursor-pointer',
                
                // Thumb hover effects
                !disabled && '[&::-webkit-slider-thumb]:hover:scale-110',
                
                // Webkit thumb sizes - perfectly sized to center on track
                size === 'sm' && '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
                size === 'md' && '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
                size === 'lg' && '[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6',
                
                // Firefox thumb styles
                '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full',
                '[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2',
                '[&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:shadow-lg',
                '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none',
                
                // Firefox thumb sizes 
                size === 'sm' && '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
                size === 'md' && '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
                size === 'lg' && '[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6',
                
                // Disabled states
                disabled && 'cursor-not-allowed [&::-webkit-slider-thumb]:cursor-not-allowed [&::-webkit-slider-thumb]:bg-gray-300 [&::-webkit-slider-thumb]:border-gray-400',
                
                // Error states
                error && '[&::-webkit-slider-thumb]:border-red-500'
              )}
              aria-labelledby={label ? `${ratingId}-label` : undefined}
              aria-describedby={helperText ? `${ratingId}-help` : undefined}
            />
          </div>

          {/* Number Tick Marks */}
          {showNumbers && (
            <div className="flex justify-between mt-2">
              {Array.from({ length: maxRating + 1 }, (_, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex flex-col items-center',
                    sizeStyles[size].text,
                    'text-gray-500 select-none'
                  )}
                >
                  <div className="w-px h-1 bg-gray-300" />
                  <span className="mt-0.5 font-medium">{index}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rating Value Display */}
        {currentValue > 0 && (
          <div className="text-sm">
            <span className="font-medium text-gray-900">
              {currentValue}/{maxRating}
            </span>
          </div>
        )}

        {currentValue === 0 && !error && (
          <div className="text-sm text-gray-500">
            No rating selected
          </div>
        )}

        {/* Helper Text or Error */}
        {(error || helperText) && (
          <p 
            id={helperText ? `${ratingId}-help` : undefined}
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

Rating.displayName = 'Rating';

export { Rating, type RatingProps };
