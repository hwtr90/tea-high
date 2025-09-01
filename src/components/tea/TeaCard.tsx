'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tea } from '@/lib/types/tea';
import { StarIcon, CalendarIcon, PackageIcon, Package2Icon } from '@/components/ui/icons';

interface TeaCardProps {
  tea: Tea;
  onClick?: (tea: Tea) => void;
  className?: string;
  showActions?: boolean;
  onToggleStock?: (tea: Tea) => void;
  onEdit?: (tea: Tea) => void;
  onDelete?: (tea: Tea) => void;
}

export const TeaCard: React.FC<TeaCardProps> = ({
  tea,
  onClick,
  className,
  showActions = false,
  onToggleStock,
  onEdit,
  onDelete
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger onClick if clicking on action buttons
    if ((e.target as HTMLElement).closest('[data-action]')) {
      return;
    }
    onClick?.(tea);
  };

  const getRatingColor = (rating: number) => {
    if (rating === 0) return 'text-gray-400';
    if (rating <= 3) return 'text-red-500';
    if (rating <= 6) return 'text-yellow-500';
    if (rating <= 8) return 'text-blue-500';
    return 'text-green-500';
  };

  const getRatingStars = (rating: number) => {
    if (rating === 0) return null;
    return (
      <div className="flex items-center gap-1">
        <span className={cn("text-sm font-medium", getRatingColor(rating))}>
          {rating}/10
        </span>
        <StarIcon className={cn("w-4 h-4", getRatingColor(rating))} />
      </div>
    );
  };

  const formatPurchaseDate = (date: Date | undefined) => {
    if (!date) return null;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    const colors: {[key: string]: string} = {
      'Black': 'bg-amber-100 text-amber-800',
      'Green': 'bg-green-100 text-green-800',
      'White': 'bg-gray-100 text-gray-800',
      'Oolong': 'bg-blue-100 text-blue-800',
      'Pu-erh': 'bg-purple-100 text-purple-800',
      'Herbal': 'bg-pink-100 text-pink-800',
      'Rooibos': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl p-4 shadow-sm border border-gray-200',
        'hover:shadow-md hover:border-gray-300 transition-all duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate text-lg">
            {tea.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {tea.supplier}
          </p>
        </div>
        
        {/* Stock Status */}
        <div className="ml-3 flex-shrink-0">
          {tea.inStock ? (
            <div className="flex items-center gap-1 text-green-600">
              <PackageIcon className="w-4 h-4" />
              <span className="text-xs font-medium">In Stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-500">
              <Package2Icon className="w-4 h-4" />
              <span className="text-xs font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </div>

      {/* Tea Type & Rating */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          getTypeColor(tea.type)
        )}>
          {tea.type}
        </span>
        
        {getRatingStars(tea.rating || 0)}
      </div>

      {/* Tasting Notes Preview */}
      {tea.tastingNotes.taste && (
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            {tea.tastingNotes.taste.length > 80 
              ? `${tea.tastingNotes.taste.substring(0, 80)}...` 
              : tea.tastingNotes.taste}
          </p>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          {tea.purchaseDate && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>{formatPurchaseDate(tea.purchaseDate)}</span>
            </div>
          )}
          
          {tea.harvestYear && (
            <span>
              {tea.harvestSeason ? `${tea.harvestSeason} ` : ''}{tea.harvestYear}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {showActions ? (
          <div className="flex items-center gap-2" data-action>
            {onToggleStock && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStock(tea);
                }}
                className={cn(
                  "px-2 py-1 text-xs rounded-md font-medium transition-colors",
                  tea.inStock
                    ? "text-red-600 hover:bg-red-50"
                    : "text-green-600 hover:bg-green-50"
                )}
                title={tea.inStock ? "Mark as out of stock" : "Mark as in stock"}
              >
                {tea.inStock ? "Out" : "In"}
              </button>
            )}
            
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(tea);
                }}
                className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-md font-medium transition-colors"
                title="Edit tea"
              >
                Edit
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(tea);
                }}
                className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors"
                title="Delete tea"
              >
                Delete
              </button>
            )}
          </div>
        ) : onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(tea);
            }}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md font-medium transition-colors"
            data-action
            title="Edit tea details"
          >
            Edit
          </button>
        )}
      </div>

      {/* Brewing Quick Info */}
      {(tea.brewingParams.temperature || tea.brewingParams.time) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {tea.brewingParams.temperature && (
              <span>{tea.brewingParams.temperature}°F</span>
            )}
            {tea.brewingParams.time && (
              <span>{Math.floor(tea.brewingParams.time / 60)}:{(tea.brewingParams.time % 60).toString().padStart(2, '0')}</span>
            )}
            {tea.brewingParams.grams && (
              <span>{tea.brewingParams.grams}g</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeaCard;
