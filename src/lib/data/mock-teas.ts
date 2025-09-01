// Mock Tea Data for Development and Testing
// Realistic sample data based on popular teas and suppliers

import { Tea, Supplier, TeaType } from '../types/tea';

// Mock Suppliers
export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Harney & Sons',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2', 
    name: 'Twinings',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Rishi Tea',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'David\'s Tea',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '5',
    name: 'Celestial Seasonings',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '6',
    name: 'Tazo',
    createdAt: new Date('2024-02-20')
  },
  {
    id: '7',
    name: 'The Tea Spot',
    createdAt: new Date('2024-03-01')
  }
];

// Mock Tea Data
export const mockTeas: Tea[] = [
  {
    id: '1',
    name: 'Earl Grey Supreme',
    type: 'Black',
    supplier: 'Harney & Sons',
    inStock: true,
    purchaseDate: new Date('2024-03-15'),
    rating: 9,
    tastingNotes: {
      dryLeaf: 'Fragrant bergamot oil with cornflower petals, classic Earl Grey aroma',
      wetLeaf: 'Strong bergamot with hints of vanilla and citrus zest',
      taste: 'Bold black tea base with bright bergamot, smooth finish with subtle floral notes'
    },
    supplierDescription: 'Premium Ceylon black tea blended with oil of bergamot and cornflower petals. A refined take on the classic Earl Grey.',
    brewingParams: {
      temperature: 212,
      grams: 2.5,
      time: 300,
      steeps: 1
    },
    harvestSeason: 'Spring',
    harvestYear: 2023,
    createdAt: new Date('2024-03-16'),
    updatedAt: new Date('2024-03-16')
  },
  {
    id: '2',
    name: 'Dragon Well (Longjing)',
    type: 'Green',
    supplier: 'Rishi Tea',
    inStock: true,
    purchaseDate: new Date('2024-03-20'),
    rating: 8,
    tastingNotes: {
      dryLeaf: 'Flat, sword-shaped leaves with fresh vegetal aroma',
      wetLeaf: 'Sweet grass and light nutty fragrance',
      taste: 'Delicate, sweet with gentle astringency. Notes of fresh grass and toasted nuts'
    },
    supplierDescription: 'Authentic Dragon Well green tea from the hills of Hangzhou. Hand-picked and pan-fired for a sweet, mellow flavor.',
    brewingParams: {
      temperature: 175,
      grams: 3,
      time: 180,
      steeps: 3
    },
    harvestSeason: 'Early Spring',
    harvestYear: 2024,
    createdAt: new Date('2024-03-21'),
    updatedAt: new Date('2024-03-21')
  },
  {
    id: '3',
    name: 'Chamomile Dreams',
    type: 'Herbal',
    supplier: 'Celestial Seasonings',
    inStock: false,
    purchaseDate: new Date('2024-02-10'),
    rating: 7,
    tastingNotes: {
      dryLeaf: 'Sweet honey-like aroma with dried chamomile flowers',
      wetLeaf: 'Apple-like fragrance with floral honey notes',
      taste: 'Soothing and sweet, honey-like with mild apple undertones. Very calming'
    },
    supplierDescription: 'Pure chamomile flowers carefully dried to preserve their natural oils. Perfect for evening relaxation.',
    brewingParams: {
      temperature: 212,
      grams: 1.5,
      time: 360,
      steeps: 1
    },
    createdAt: new Date('2024-02-11'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: '4',
    name: 'Ti Kuan Yin Oolong',
    type: 'Oolong',
    supplier: 'The Tea Spot',
    inStock: true,
    purchaseDate: new Date('2024-03-25'),
    rating: 10,
    tastingNotes: {
      dryLeaf: 'Tightly rolled balls with floral, orchid-like fragrance',
      wetLeaf: 'Complex floral bouquet with hints of stone fruit',
      taste: 'Incredibly smooth and complex. Floral with peachy undertones, long sweet finish'
    },
    supplierDescription: 'Premium Iron Goddess oolong from Fujian province. Traditional processing creates exceptional depth and complexity.',
    brewingParams: {
      temperature: 195,
      grams: 2,
      time: 120,
      steeps: 6
    },
    harvestSeason: 'Fall',
    harvestYear: 2023,
    createdAt: new Date('2024-03-26'),
    updatedAt: new Date('2024-03-26')
  },
  {
    id: '5',
    name: 'English Breakfast',
    type: 'Black',
    supplier: 'Twinings',
    inStock: true,
    purchaseDate: new Date('2024-01-30'),
    rating: 6,
    tastingNotes: {
      dryLeaf: 'Rich, malty aroma typical of breakfast blends',
      wetLeaf: 'Strong and robust with hints of caramel',
      taste: 'Full-bodied and malty, takes milk well. Somewhat one-dimensional but reliable'
    },
    supplierDescription: 'Traditional English Breakfast blend of Ceylon, Assam, and Kenyan black teas. Perfect with milk and sugar.',
    brewingParams: {
      temperature: 212,
      grams: 2,
      time: 240,
      steeps: 1
    },
    createdAt: new Date('2024-01-31'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '6',
    name: 'Silver Needle (Bai Hao Yin Zhen)',
    type: 'White',
    supplier: 'Rishi Tea',
    inStock: true,
    purchaseDate: new Date('2024-03-10'),
    rating: 9,
    tastingNotes: {
      dryLeaf: 'Beautiful silver-white buds with subtle sweet aroma',
      wetLeaf: 'Delicate honeyed fragrance with light floral notes',
      taste: 'Extraordinarily delicate and sweet. Light body with honey and melon notes'
    },
    supplierDescription: 'Rare white tea made only from silver buds. Hand-picked during a brief window in early spring.',
    brewingParams: {
      temperature: 185,
      grams: 3,
      time: 240,
      steeps: 4
    },
    harvestSeason: 'Early Spring',
    harvestYear: 2024,
    createdAt: new Date('2024-03-11'),
    updatedAt: new Date('2024-03-11')
  },
  {
    id: '7',
    name: 'Chocolate Mint Rooibos',
    type: 'Rooibos',
    supplier: 'David\'s Tea',
    inStock: false,
    purchaseDate: new Date('2024-02-20'),
    rating: 5,
    tastingNotes: {
      dryLeaf: 'Sweet chocolate and mint blend with red rooibos',
      wetLeaf: 'Strong peppermint with artificial chocolate scent',
      taste: 'Very minty, chocolate flavor is artificial tasting. Too sweet overall'
    },
    supplierDescription: 'South African red bush tea blended with chocolate pieces and peppermint. Naturally caffeine-free.',
    brewingParams: {
      temperature: 212,
      grams: 2,
      time: 300,
      steeps: 1
    },
    createdAt: new Date('2024-02-21'),
    updatedAt: new Date('2024-03-05')
  },
  {
    id: '8',
    name: 'Jasmine Phoenix Pearls',
    type: 'Green',
    supplier: 'Harney & Sons',
    inStock: true,
    purchaseDate: new Date('2024-03-28'),
    rating: 8,
    tastingNotes: {
      dryLeaf: 'Hand-rolled pearls with intense jasmine fragrance',
      wetLeaf: 'Intoxicating jasmine aroma with green tea base',
      taste: 'Beautiful balance of jasmine flowers and green tea. Floral without being overwhelming'
    },
    supplierDescription: 'Premium green tea pearls scented with fresh jasmine flowers using traditional methods.',
    brewingParams: {
      temperature: 175,
      grams: 2,
      time: 150,
      steeps: 3
    },
    harvestSeason: 'Spring',
    harvestYear: 2023,
    createdAt: new Date('2024-03-29'),
    updatedAt: new Date('2024-03-29')
  },
  {
    id: '9',
    name: 'Zen Green Tea',
    type: 'Green',
    supplier: 'Tazo',
    inStock: true,
    purchaseDate: new Date('2024-02-05'),
    rating: 0, // Not rated yet
    tastingNotes: {
      dryLeaf: 'Simple green tea blend with lemon verbena',
      wetLeaf: 'Light citrus and vegetal notes',
      taste: '' // Haven't tasted yet
    },
    supplierDescription: 'Smooth green tea blend with lemon verbena, spearmint, and lemongrass.',
    brewingParams: {
      temperature: 175,
      grams: 1.5,
      time: 180,
      steeps: 2
    },
    createdAt: new Date('2024-02-06'),
    updatedAt: new Date('2024-02-06')
  },
  {
    id: '10',
    name: 'Aged Sheng Pu-erh 2015',
    type: 'Pu-erh',
    supplier: 'The Tea Spot',
    inStock: true,
    purchaseDate: new Date('2024-03-12'),
    rating: 9,
    tastingNotes: {
      dryLeaf: 'Earthy, forest-like aroma with hints of leather',
      wetLeaf: 'Deep, complex earthiness with sweet undertones',
      taste: 'Rich and complex with earthy depth. Sweet aftertaste develops beautifully'
    },
    supplierDescription: 'Raw pu-erh tea pressed in 2015 and aged naturally. Complex flavor develops with each steep.',
    brewingParams: {
      temperature: 212,
      grams: 4,
      time: 60,
      steeps: 8
    },
    harvestSeason: 'Spring',
    harvestYear: 2015,
    createdAt: new Date('2024-03-13'),
    updatedAt: new Date('2024-03-13')
  }
];

// Helper functions for working with mock data
export const getMockTeaById = (id: string): Tea | undefined => {
  return mockTeas.find(tea => tea.id === id);
};

export const getMockSupplierByName = (name: string): Supplier | undefined => {
  return mockSuppliers.find(supplier => supplier.name === name);
};

export const getMockTeasBySupplier = (supplierName: string): Tea[] => {
  return mockTeas.filter(tea => tea.supplier === supplierName);
};

export const getMockTeasByType = (type: TeaType): Tea[] => {
  return mockTeas.filter(tea => tea.type === type);
};

export const getMockInStockTeas = (): Tea[] => {
  return mockTeas.filter(tea => tea.inStock);
};

export const getMockOutOfStockTeas = (): Tea[] => {
  return mockTeas.filter(tea => !tea.inStock);
};

export const getMockRatedTeas = (): Tea[] => {
  return mockTeas.filter(tea => tea.rating && tea.rating > 0);
};

export const getMockUnratedTeas = (): Tea[] => {
  return mockTeas.filter(tea => !tea.rating || tea.rating === 0);
};

// Get unique values for filter dropdowns
export const getUniqueSuppliers = (): string[] => {
  const suppliers = mockTeas.map(tea => tea.supplier);
  return [...new Set(suppliers)].sort();
};

export const getUniqueTeaTypes = (): TeaType[] => {
  const types = mockTeas.map(tea => tea.type);
  return [...new Set(types)].sort();
};
