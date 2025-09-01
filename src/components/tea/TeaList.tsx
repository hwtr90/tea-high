'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tea } from '@/lib/types/tea';
import { TeaCard } from './TeaCard';
import { PlusIcon, FilterIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';

interface TeaListProps {
  teas: Tea[];
  onAddTea?: () => void;
  onTeaClick?: (tea: Tea) => void;
  onEditTea?: (tea: Tea) => void;
  onDeleteTea?: (tea: Tea) => void;
  onToggleStock?: (tea: Tea) => void;
  className?: string;
  showActions?: boolean;
  emptyState?: React.ReactNode;
}

export const TeaList: React.FC<TeaListProps> = ({
  teas,
  onAddTea,
  onTeaClick,
  onEditTea,
  onDeleteTea,
  onToggleStock,
  className,
  showActions = true,
  emptyState
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const inStockTeas = teas.filter(tea => tea.inStock);
  const outOfStockTeas = teas.filter(tea => !tea.inStock);

  if (teas.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        {emptyState || (
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <PlusIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No teas yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start building your tea collection by adding your first tea.
            </p>
            {onAddTea && (
              <Button 
                variant="primary" 
                size="lg"
                onClick={onAddTea}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Your First Tea
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            My Tea Collection
          </h2>
          <p className="text-gray-600 mt-1">
            {inStockTeas.length} in stock, {outOfStockTeas.length} out of stock
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                viewMode === 'grid'
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                viewMode === 'list'
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              List
            </button>
          </div>

          {onAddTea && (
            <Button 
              variant="primary" 
              size="md"
              onClick={onAddTea}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Tea
            </Button>
          )}
        </div>
      </div>

      {/* In Stock Section */}
      {inStockTeas.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            In Stock ({inStockTeas.length})
          </h3>
          
          <div className={cn(
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          )}>
            {inStockTeas.map((tea) => (
              <TeaCard
                key={tea.id}
                tea={tea}
                onClick={onTeaClick}
                onEdit={onEditTea}
                showActions={showActions}
                className={viewMode === 'list' ? 'max-w-none' : ''}
              />
            ))}
          </div>
        </div>
      )}

      {/* Out of Stock Section */}
      {outOfStockTeas.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            Out of Stock ({outOfStockTeas.length})
          </h3>
          
          <div className={cn(
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          )}>
            {outOfStockTeas.map((tea) => (
              <TeaCard
                key={tea.id}
                tea={tea}
                onClick={onTeaClick}
                onEdit={onEditTea}
                showActions={showActions}
                className={cn(
                  'opacity-75 hover:opacity-100 transition-opacity',
                  viewMode === 'list' ? 'max-w-none' : ''
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-gray-50 rounded-lg p-4 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{teas.length}</div>
            <div className="text-sm text-gray-600">Total Teas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{inStockTeas.length}</div>
            <div className="text-sm text-gray-600">In Stock</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {teas.filter(tea => tea.rating && tea.rating > 0).length}
            </div>
            <div className="text-sm text-gray-600">Rated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {teas.reduce((sum, tea) => sum + (tea.rating || 0), 0) / teas.filter(tea => tea.rating && tea.rating > 0).length || 0}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaList;
