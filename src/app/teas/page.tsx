'use client';

import React, { useState } from 'react';
import { TeaList } from '@/components/tea/TeaList';
import { TeaForm } from '@/components/tea/TeaForm';
import { mockTeas } from '@/lib/data/mock-teas';
import { Tea, TeaFormData } from '@/lib/types/tea';
import { ArrowLeftIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type ViewMode = 'list' | 'add' | 'edit';

export default function TeasPage() {
  // State management
  const [teas, setTeas] = useState<Tea[]>(mockTeas);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingTea, setEditingTea] = useState<Tea | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle adding a new tea
  const handleAddTea = () => {
    setEditingTea(null);
    setViewMode('add');
  };

  // Handle editing a tea
  const handleEditTea = (tea: Tea) => {
    setEditingTea(tea);
    setViewMode('edit');
  };

  // Handle tea click (view details)
  const handleTeaClick = (tea: Tea) => {
    // For now, just show an alert - later this will navigate to detail page
    alert(`Clicked on: ${tea.name}\n\nRating: ${tea.rating || 'Not rated'}/10\nSupplier: ${tea.supplier}\nIn Stock: ${tea.inStock ? 'Yes' : 'No'}\n\nTaste: ${tea.tastingNotes.taste || 'No notes yet'}`);
  };

  // Handle deleting a tea
  const handleDeleteTea = (tea: Tea) => {
    if (window.confirm(`Are you sure you want to delete "${tea.name}"?`)) {
      setTeas(prev => prev.filter(t => t.id !== tea.id));
    }
  };

  // Handle toggling stock status
  const handleToggleStock = (tea: Tea) => {
    setTeas(prev => prev.map(t => 
      t.id === tea.id 
        ? { ...t, inStock: !t.inStock, updatedAt: new Date() }
        : t
    ));
  };

  // Handle form submission (add or edit)
  const handleFormSubmit = async (formData: TeaFormData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (viewMode === 'add') {
      // Add new tea
      const newTea: Tea = {
        ...formData,
        id: `tea-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTeas(prev => [newTea, ...prev]);
    } else if (viewMode === 'edit' && editingTea) {
      // Update existing tea
      const updatedTea: Tea = {
        ...editingTea,
        ...formData,
        updatedAt: new Date()
      };
      setTeas(prev => prev.map(t => t.id === editingTea.id ? updatedTea : t));
    }
    
    setIsLoading(false);
    setViewMode('list');
    setEditingTea(null);
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setViewMode('list');
    setEditingTea(null);
  };

  // Handle form delete
  const handleFormDelete = () => {
    if (editingTea && window.confirm(`Are you sure you want to delete "${editingTea.name}"? This action cannot be undone.`)) {
      setTeas(prev => prev.filter(t => t.id !== editingTea.id));
      setViewMode('list');
      setEditingTea(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'list' ? (
          <>
            {/* Navigation */}
            <div className="mb-6">
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Component Demo
              </Link>
            </div>

            {/* Tea List */}
            <TeaList
              teas={teas}
              onAddTea={handleAddTea}
              onTeaClick={handleTeaClick}
              onEditTea={handleEditTea}
              showActions={false}
            />
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Form Header */}
            <div className="mb-6">
              <button
                onClick={handleFormCancel}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Tea List
              </button>
              
              <h1 className="text-3xl font-bold text-gray-900">
                {viewMode === 'add' ? 'Add New Tea' : 'Edit Tea'}
              </h1>
              <p className="text-gray-600 mt-2">
                {viewMode === 'add' 
                  ? 'Add a new tea to your collection with detailed tasting notes and brewing parameters.'
                  : `Update the details for "${editingTea?.name}".`
                }
              </p>
            </div>

            {/* Tea Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                          <TeaForm
              initialData={editingTea || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              onDelete={viewMode === 'edit' ? handleFormDelete : undefined}
              isLoading={isLoading}
              submitLabel={viewMode === 'add' ? 'Add Tea' : 'Update Tea'}
            />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
