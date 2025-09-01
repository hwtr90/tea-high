'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tea, TeaFormData, TEA_TYPES, HARVEST_SEASONS } from '@/lib/types/tea';
import { getUniqueSuppliers } from '@/lib/data/mock-teas';

// UI Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import { Rating } from '@/components/ui/Rating';
import { Switch } from '@/components/ui/Switch';
import { CalendarIcon, FlaskIcon, ThermometerIcon } from '@/components/ui/icons';

interface TeaFormProps {
  initialData?: Partial<Tea>;
  onSubmit: (data: TeaFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  className?: string;
}

export const TeaForm: React.FC<TeaFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  onDelete,
  isLoading = false,
  submitLabel = 'Save Tea',
  className
}) => {
  // Form state initialization
  const [formData, setFormData] = useState<TeaFormData>({
    name: initialData?.name || '',
    type: initialData?.type || 'Black',
    supplier: initialData?.supplier || '',
    inStock: initialData?.inStock ?? true,
    purchaseDate: initialData?.purchaseDate,
    rating: initialData?.rating || 0,
    tastingNotes: {
      dryLeaf: initialData?.tastingNotes?.dryLeaf || '',
      wetLeaf: initialData?.tastingNotes?.wetLeaf || '',
      taste: initialData?.tastingNotes?.taste || ''
    },
    supplierDescription: initialData?.supplierDescription || '',
    brewingParams: {
      temperature: initialData?.brewingParams?.temperature,
      grams: initialData?.brewingParams?.grams,
      time: initialData?.brewingParams?.time,
      steeps: initialData?.brewingParams?.steeps
    },
    harvestSeason: initialData?.harvestSeason,
    harvestYear: initialData?.harvestYear
  });

  // Form errors state
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Determine if we're editing an existing tea
  const isEditing = !!(initialData?.id || (initialData && Object.keys(initialData).length > 0));

  // Available suppliers for dropdown
  const suppliers = getUniqueSuppliers();
  const supplierOptions = suppliers.map(supplier => ({ label: supplier, value: supplier }));

  // Tea type options
  const teaTypeOptions = TEA_TYPES.map(type => ({ label: type, value: type }));

  // Harvest season options
  const seasonOptions = HARVEST_SEASONS.map(season => ({ label: season, value: season }));

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Tea name is required';
    }
    if (!formData.supplier.trim()) {
      newErrors.supplier = 'Supplier is required';
    }

    // Numeric validations
    if (formData.brewingParams.temperature && (formData.brewingParams.temperature < 32 || formData.brewingParams.temperature > 212)) {
      newErrors.temperature = 'Temperature must be between 32-212°F';
    }
    if (formData.brewingParams.grams && (formData.brewingParams.grams < 0.1 || formData.brewingParams.grams > 50)) {
      newErrors.grams = 'Tea amount must be between 0.1-50 grams';
    }
    if (formData.brewingParams.time && (formData.brewingParams.time < 5 || formData.brewingParams.time > 3600)) {
      newErrors.time = 'Steeping time must be between 5-3600 seconds';
    }
    if (formData.brewingParams.steeps && (formData.brewingParams.steeps < 1 || formData.brewingParams.steeps > 20)) {
      newErrors.steeps = 'Number of steeps must be between 1-20';
    }
    if (formData.harvestYear && (formData.harvestYear < 1900 || formData.harvestYear > new Date().getFullYear() + 1)) {
      newErrors.harvestYear = `Harvest year must be between 1900-${new Date().getFullYear() + 1}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  // Handle field changes
  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedFieldChange = (parent: 'tastingNotes' | 'brewingParams', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle new supplier addition
  const handleAddSupplier = (newSupplier: string) => {
    // In a real app, this would make an API call to create the supplier
    console.log('Adding new supplier:', newSupplier);
    handleFieldChange('supplier', newSupplier);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Basic Information
        </h3>
        
        <Input
          label="Tea Name"
          value={formData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          placeholder="Enter tea name..."
          error={errors.name}
          required
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Tea Type"
            options={teaTypeOptions}
            value={formData.type}
            onChange={(value) => handleFieldChange('type', value)}
            required
            disabled={isLoading}
          />

          <Select
            label="Supplier"
            options={supplierOptions}
            value={formData.supplier}
            onChange={(value) => handleFieldChange('supplier', value)}
            placeholder="Select supplier..."
            allowCustom
            customPlaceholder="Add new supplier..."
            onAddCustom={handleAddSupplier}
            error={errors.supplier}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Stock & Purchase Info - Only show when editing */}
      {isEditing && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Stock & Purchase
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Switch
              label="In Stock"
              checked={formData.inStock}
              onChange={(checked) => handleFieldChange('inStock', checked)}
              disabled={isLoading}
              color="green"
              size="md"
              helperText={formData.inStock ? "This tea is available in your collection" : "This tea is currently out of stock"}
            />

            <Input
              label="Purchase Date"
              type="date"
              value={formData.purchaseDate ? formData.purchaseDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleFieldChange('purchaseDate', e.target.value ? new Date(e.target.value) : undefined)}
              leftIcon={<CalendarIcon className="w-4 h-4" />}
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Rating & Experience
        </h3>
        
        <Rating
          label="Overall Rating (0-10)"
          value={formData.rating}
          onChange={(value) => handleFieldChange('rating', value)}
          helperText="Rate this tea from 0 (not rated) to 10 (perfect)"
          showNumbers={true}
          disabled={isLoading}
        />
      </div>

      {/* Tasting Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Tasting Notes
        </h3>
        
        <TextArea
          label="Dry Leaf"
          value={formData.tastingNotes.dryLeaf}
          onChange={(e) => handleNestedFieldChange('tastingNotes', 'dryLeaf', e.target.value)}
          placeholder="Describe the aroma and appearance of dry leaves..."
          helperText="What does the tea look and smell like before brewing?"
          minRows={2}
          maxRows={4}
          disabled={isLoading}
        />

        <TextArea
          label="Wet Leaf"
          value={formData.tastingNotes.wetLeaf}
          onChange={(e) => handleNestedFieldChange('tastingNotes', 'wetLeaf', e.target.value)}
          placeholder="Describe the aroma and appearance after steeping..."
          helperText="How do the leaves look and smell after brewing?"
          minRows={2}
          maxRows={4}
          disabled={isLoading}
        />

        <TextArea
          label="Taste"
          value={formData.tastingNotes.taste}
          onChange={(e) => handleNestedFieldChange('tastingNotes', 'taste', e.target.value)}
          placeholder="Describe the flavor notes and overall taste experience..."
          helperText="What flavors do you detect? How does it make you feel?"
          minRows={3}
          maxRows={5}
          disabled={isLoading}
        />

        <TextArea
          label="Supplier Description"
          value={formData.supplierDescription}
          onChange={(e) => handleFieldChange('supplierDescription', e.target.value)}
          placeholder="Copy the supplier's description of this tea..."
          helperText="What does the supplier say about this tea?"
          minRows={2}
          maxRows={4}
          disabled={isLoading}
        />
      </div>

      {/* Brewing Parameters */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
          <FlaskIcon className="w-5 h-5" />
          Brewing Parameters
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Temperature (°F)"
            type="number"
            value={formData.brewingParams.temperature || ''}
            onChange={(e) => handleNestedFieldChange('brewingParams', 'temperature', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="212"
            leftIcon={<ThermometerIcon className="w-4 h-4" />}
            helperText="32-212°F"
            error={errors.temperature}
            disabled={isLoading}
          />

          <Input
            label="Tea Amount (grams)"
            type="number"
            step="0.1"
            value={formData.brewingParams.grams || ''}
            onChange={(e) => handleNestedFieldChange('brewingParams', 'grams', e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="2.5"
            helperText="0.1-50 grams"
            error={errors.grams}
            disabled={isLoading}
          />

          <Input
            label="Steeping Time (seconds)"
            type="number"
            value={formData.brewingParams.time || ''}
            onChange={(e) => handleNestedFieldChange('brewingParams', 'time', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="300"
            helperText="5-3600 seconds"
            error={errors.time}
            disabled={isLoading}
          />

          <Input
            label="Number of Steeps"
            type="number"
            value={formData.brewingParams.steeps || ''}
            onChange={(e) => handleNestedFieldChange('brewingParams', 'steeps', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="1"
            helperText="1-20 steeps"
            error={errors.steeps}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Harvest Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Harvest Information <span className="text-sm text-gray-500 font-normal">(Optional)</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Harvest Season"
            options={seasonOptions}
            value={formData.harvestSeason || ''}
            onChange={(value) => handleFieldChange('harvestSeason', value || undefined)}
            placeholder="Select season..."
            disabled={isLoading}
          />

          <Input
            label="Harvest Year"
            type="number"
            value={formData.harvestYear || ''}
            onChange={(e) => handleFieldChange('harvestYear', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="2024"
            helperText={`1900-${new Date().getFullYear() + 1}`}
            error={errors.harvestYear}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Danger Zone - Only show when editing */}
      {isEditing && onDelete && (
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-red-900">
            Danger Zone
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium text-red-800">Delete Tea</h4>
                <p className="text-sm text-red-700 mt-1">
                  Permanently remove this tea from your collection. This action cannot be undone.
                </p>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onDelete}
                disabled={isLoading}
              >
                Delete Tea
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          className="sm:flex-1"
        >
          {submitLabel}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onCancel}
            disabled={isLoading}
            className="sm:flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TeaForm;
