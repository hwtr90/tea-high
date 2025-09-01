// Tea High App - Data Type Definitions
// Based on PRD requirements for comprehensive tea tracking

export interface Tea {
  id: string;
  
  // Basic Information
  name: string;
  type: TeaType;
  supplier: string;
  
  // Stock Management
  inStock: boolean;
  purchaseDate?: Date;
  
  // Tasting Information
  rating?: number; // 0-10 scale, 0 = not rated
  tastingNotes: TastingNotes;
  supplierDescription?: string;
  
  // Brewing Parameters
  brewingParams: BrewingParams;
  
  // Harvest Information (optional)
  harvestSeason?: HarvestSeason;
  harvestYear?: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface TastingNotes {
  dryLeaf?: string;  // Aroma and appearance of dry leaves
  wetLeaf?: string;  // Aroma and appearance after steeping
  taste?: string;    // Flavor notes and overall taste experience
}

export interface BrewingParams {
  temperature?: number;  // Water temperature in Fahrenheit
  grams?: number;       // Tea amount in grams
  time?: number;        // Steeping time in seconds
  steeps?: number;      // Number of steeps/infusions
}

// Tea Categories - Based on common tea classifications
export type TeaType = 
  | 'Black'
  | 'Green' 
  | 'White'
  | 'Oolong'
  | 'Pu-erh'
  | 'Yellow'
  | 'Dark'
  | 'Herbal'
  | 'Rooibos'
  | 'Tisane'
  | 'Blend'
  | 'Other';

// Harvest Seasons
export type HarvestSeason = 
  | 'Spring'
  | 'Summer' 
  | 'Fall'
  | 'Winter'
  | 'Early Spring'
  | 'Late Spring'
  | 'Early Summer'
  | 'Late Summer'
  | 'Early Fall'
  | 'Late Fall';

// Supplier interface for managing tea suppliers
export interface Supplier {
  id: string;
  name: string;
  createdAt: Date;
}

// Form interfaces for components
export interface TeaFormData extends Omit<Tea, 'id' | 'createdAt' | 'updatedAt'> {
  // Form-specific modifications if needed
}

// Filter and sorting interfaces
export interface TeaFilters {
  searchQuery?: string;
  types?: TeaType[];
  suppliers?: string[];
  inStock?: boolean;
  ratingRange?: {
    min: number;
    max: number;
  };
  harvestYearRange?: {
    min: number;
    max: number;
  };
}

export type TeaSortField = 
  | 'name'
  | 'type' 
  | 'supplier'
  | 'rating'
  | 'purchaseDate'
  | 'harvestYear'
  | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface TeaSort {
  field: TeaSortField;
  direction: SortDirection;
}

// Constants for dropdowns and validation
export const TEA_TYPES: TeaType[] = [
  'Black',
  'Green', 
  'White',
  'Oolong',
  'Pu-erh',
  'Yellow',
  'Dark',
  'Herbal',
  'Rooibos',
  'Tisane',
  'Blend',
  'Other'
];

export const HARVEST_SEASONS: HarvestSeason[] = [
  'Spring',
  'Summer',
  'Fall', 
  'Winter',
  'Early Spring',
  'Late Spring',
  'Early Summer',
  'Late Summer',
  'Early Fall',
  'Late Fall'
];

// Validation constants
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 1,
    maxLength: 200
  },
  rating: {
    min: 0,
    max: 10
  },
  temperature: {
    min: 32,  // Freezing point
    max: 212  // Boiling point (Fahrenheit)
  },
  grams: {
    min: 0.1,
    max: 50
  },
  time: {
    min: 5,    // 5 seconds minimum
    max: 3600  // 1 hour maximum (in seconds)
  },
  steeps: {
    min: 1,
    max: 20
  },
  harvestYear: {
    min: 1900,
    max: new Date().getFullYear() + 1
  }
} as const;
