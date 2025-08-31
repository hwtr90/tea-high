'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, XIcon, PlusIcon, CheckIcon } from './icons';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  allowCustom?: boolean; // For suppliers - allows adding new options
  onAddCustom?: (newValue: string) => void;
  customPlaceholder?: string; // Placeholder for custom input
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({
    label,
    placeholder = 'Select an option...',
    options = [],
    value,
    defaultValue,
    onChange,
    error,
    helperText,
    disabled = false,
    required = false,
    fullWidth = true,
    allowCustom = false,
    onAddCustom,
    customPlaceholder = 'Add new option...',
    id,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
    const [isAddingCustom, setIsAddingCustom] = useState(false);
    const [customValue, setCustomValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const generatedId = useId();
    const inputId = id || generatedId;

    // Handle outside click to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setIsAddingCustom(false);
          setCustomValue('');
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus custom input when entering add mode
    useEffect(() => {
      if (isAddingCustom && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isAddingCustom]);

    const selectedOption = options.find(option => option.value === selectedValue);
    const displayValue = selectedOption?.label || '';

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    };

    const handleAddCustom = () => {
      if (customValue.trim()) {
        onAddCustom?.(customValue.trim());
        setSelectedValue(customValue.trim());
        onChange?.(customValue.trim());
        setCustomValue('');
        setIsAddingCustom(false);
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && isAddingCustom) {
        e.preventDefault();
        handleAddCustom();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setIsAddingCustom(false);
        setCustomValue('');
        setSearchTerm('');
      }
    };

    const buttonStyles = [
      // Base styles - mobile-first design
      'flex h-12 w-full items-center justify-between rounded-lg border px-4 py-3',
      'bg-white text-left text-base transition-colors duration-200',
      // Focus states
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
      // Mobile-optimized sizing
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
      <div className={cn('relative space-y-1', widthStyles)} ref={dropdownRef}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </label>
        )}

        {/* Select Button */}
        <button
          {...props}
          ref={ref}
          id={inputId}
          type="button"
          className={cn(buttonStyles, stateStyles)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${inputId}-label` : undefined}
        >
          <span className={cn(
            'block truncate',
            !displayValue && 'text-gray-400'
          )}>
            {displayValue || placeholder}
          </span>
          
          <ChevronDownIcon 
            className={cn(
              'h-4 w-4 text-gray-400 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {/* Search Input (for large option lists) */}
            {options.length > 5 && (
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* Options List */}
            <div className="py-1">
              {filteredOptions.length === 0 && searchTerm ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      'w-full px-4 py-3 text-left text-base hover:bg-gray-50 focus:bg-gray-50 focus:outline-none',
                      'flex items-center justify-between min-h-[48px]', // Touch-friendly
                      selectedValue === option.value && 'bg-blue-50 text-blue-700'
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span>{option.label}</span>
                    {selectedValue === option.value && (
                      <CheckIcon className="h-4 w-4 text-blue-700" />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Add Custom Option */}
            {allowCustom && (
              <div className="border-t border-gray-100">
                {!isAddingCustom ? (
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-base text-blue-600 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center min-h-[48px]"
                    onClick={() => setIsAddingCustom(true)}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add new option
                  </button>
                ) : (
                  <div className="p-2 space-y-2">
                    <div className="flex space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder={customPlaceholder}
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustom}
                        disabled={!customValue.trim()}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCustom(false);
                          setCustomValue('');
                        }}
                        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

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

Select.displayName = 'Select';

export { Select, type SelectProps, type SelectOption };
