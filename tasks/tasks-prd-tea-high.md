# Tasks: Tea High App Implementation

Based on the PRD requirements and current Next.js + TypeScript codebase analysis.

## Relevant Files

- `lib/supabase/client.ts` - Supabase client configuration and connection setup.
- `lib/supabase/database.types.ts` - TypeScript types generated from Supabase schema.
- `lib/supabase/auth.ts` - Authentication utilities and session management.
- `lib/supabase/queries.ts` - Database query functions for tea operations.
- `lib/supabase/queries.test.ts` - Unit tests for database query functions.
- `components/ui/Button.tsx` - Reusable button component with touch-friendly design.
- `components/ui/Input.tsx` - Form input components with validation.
- `components/ui/Select.tsx` - Dropdown select component with add-new functionality.
- `components/ui/TextArea.tsx` - Multi-line text input component.
- `components/ui/Rating.tsx` - 10-point numeric rating selector component.
- `components/tea/TeaCard.tsx` - Compact tea display component for list view.
- `components/tea/TeaForm.tsx` - Tea entry/editing form component.
- `components/tea/TeaList.tsx` - Main tea list with filtering and sorting.
- `components/tea/TeaDetail.tsx` - Expanded tea detail view component.
- `components/tea/SearchBar.tsx` - Search functionality component.
- `components/tea/FilterBar.tsx` - Filtering controls component.
- `app/page.tsx` - Main tea list page (homepage).
- `app/tea/[id]/page.tsx` - Individual tea detail page.
- `app/tea/new/page.tsx` - Add new tea page.
- `app/tea/edit/[id]/page.tsx` - Edit existing tea page.
- `app/import/page.tsx` - CSV import functionality page.
- `app/api/tea/route.ts` - API routes for tea CRUD operations.
- `app/api/suppliers/route.ts` - API routes for supplier management.
- `app/api/import/route.ts` - API route for CSV import processing.
- `lib/types/tea.ts` - TypeScript interfaces for tea data structures.
- `lib/data/mock-teas.ts` - Mock data for frontend development and testing.
- `lib/utils/csv-parser.ts` - CSV parsing utilities for data import.
- `lib/utils/validation.ts` - Form validation utilities.
- `public/manifest.json` - PWA manifest configuration.
- `public/sw.js` - Service worker for offline functionality.

### Notes

- Unit tests should be placed alongside code files (e.g., `queries.ts` and `queries.test.ts`)
- Use `npm test` to run Jest tests (need to add Jest to dependencies)
- Components follow atomic design principles (UI components → Tea-specific components → Pages)
- API routes use Next.js 13+ app router conventions

## Tasks

### Phase 1: Frontend Foundation (Visual Progress First!)

- [ ] 1.0 Core UI Component Library (Mobile-First)
  - [ ] 1.1 Create base Button component with touch-friendly sizing (`components/ui/Button.tsx`)
  - [ ] 1.2 Create Input component with validation support (`components/ui/Input.tsx`)
  - [ ] 1.3 Create Select dropdown with add-new functionality (`components/ui/Select.tsx`)
  - [ ] 1.4 Create TextArea component for multi-line inputs (`components/ui/TextArea.tsx`)
  - [ ] 1.5 Create 10-point Rating selector component (`components/ui/Rating.tsx`)
  - [ ] 1.6 Create responsive layout components for mobile-first design
  - [ ] 1.7 Implement touch-friendly interaction patterns and spacing
  - [ ] 1.8 Add loading states and error handling to all components
  - [ ] 1.9 Test components on mobile devices for touch responsiveness

- [ ] 2.0 Tea Management UI (with Mock Data)
  - [ ] 2.1 Create tea data types and interfaces (`lib/types/tea.ts`)
  - [ ] 2.2 Create mock data file with sample teas (`lib/data/mock-teas.ts`)
  - [ ] 2.3 Create TeaForm component with all PRD-specified fields (`components/tea/TeaForm.tsx`)
  - [ ] 2.4 Build TeaCard component for compact list display (`components/tea/TeaCard.tsx`)
  - [ ] 2.5 Create TeaDetail component for expanded view (`components/tea/TeaDetail.tsx`)
  - [ ] 2.6 Implement stock status toggle functionality (local state)
  - [ ] 2.7 Add form validation for required fields and data types
  - [ ] 2.8 Create pages for tea list view (`app/page.tsx`)
  - [ ] 2.9 Create pages for adding new teas (`app/tea/new/page.tsx`)
  - [ ] 2.10 Create pages for editing existing teas (`app/tea/edit/[id]/page.tsx`)
  - [ ] 2.11 Create individual tea detail pages (`app/tea/[id]/page.tsx`)
  - [ ] 2.12 Test full tea management flow on mobile with mock data

- [ ] 3.0 Search & Filtering UI (with Mock Data)
  - [ ] 3.1 Create SearchBar component for tea name search (`components/tea/SearchBar.tsx`)
  - [ ] 3.2 Implement FilterBar component with category filters (`components/tea/FilterBar.tsx`)
  - [ ] 3.3 Add filtering by tea type, supplier, rating, and stock status (mock data)
  - [ ] 3.4 Implement sorting by name, rating, type, harvest date, purchase date (mock data)
  - [ ] 3.5 Create TeaList component to display filtered/sorted results (`components/tea/TeaList.tsx`)
  - [ ] 3.6 Add URL parameter support for shareable filter states
  - [ ] 3.7 Implement real-time search with debouncing for performance
  - [ ] 3.8 Add "no results" and empty states for better UX
  - [ ] 3.9 Test complete search and filtering experience on mobile

### Phase 2: Backend Integration

- [ ] 4.0 Supabase Backend Setup & Database Schema
  - [ ] 4.1 Install Supabase client libraries (`@supabase/supabase-js`, `@supabase/auth-ui-react`)
  - [ ] 4.2 Create Supabase project and obtain credentials
  - [ ] 4.3 Set up environment variables (.env.local) for Supabase URL and keys
  - [ ] 4.4 Configure Supabase client (`lib/supabase/client.ts`)
  - [ ] 4.5 Design and create tea database table schema with all PRD fields
  - [ ] 4.6 Create suppliers table with name field and relationship to teas
  - [ ] 4.7 Generate TypeScript types from Supabase schema
  - [ ] 4.8 Set up Row Level Security (RLS) policies for user data isolation
  - [ ] 4.9 Create database indexes for filtering (type, supplier, rating, stock_status)

- [ ] 5.0 Authentication System Configuration  
  - [ ] 5.1 Configure Supabase Auth with email/password authentication
  - [ ] 5.2 Create authentication utility functions (`lib/supabase/auth.ts`)
  - [ ] 5.3 Implement login/logout functionality
  - [ ] 5.4 Create auth middleware for protecting routes
  - [ ] 5.5 Add authentication UI components (login/signup forms)
  - [ ] 5.6 Configure session management and persistence
  - [ ] 5.7 Test authentication flow and user session handling

- [ ] 6.0 Connect Frontend to Backend (Replace Mock Data)
  - [ ] 6.1 Implement tea database query functions (`lib/supabase/queries.ts`)
  - [ ] 6.2 Create API routes for tea CRUD operations (`app/api/tea/route.ts`)
  - [ ] 6.3 Create API routes for supplier management (`app/api/suppliers/route.ts`)
  - [ ] 6.4 Replace mock data with real Supabase queries in all components
  - [ ] 6.5 Implement real stock status toggle with database updates
  - [ ] 6.6 Add error handling and user feedback for all operations
  - [ ] 6.7 Test complete tea management flow with real database
  - [ ] 6.8 Update search and filtering to work with real data
  - [ ] 6.9 Implement supplier management with dynamic add-new functionality

### Phase 3: Advanced Features & Deployment

- [ ] 7.0 Data Import System (CSV to Supabase)
  - [ ] 7.1 Install CSV parsing libraries (`papaparse`, `@types/papaparse`)
  - [ ] 7.2 Create CSV parsing utilities (`lib/utils/csv-parser.ts`)
  - [ ] 7.3 Build CSV import UI with file upload (`app/import/page.tsx`)
  - [ ] 7.4 Implement field mapping interface for CSV columns to tea fields
  - [ ] 7.5 Create API route for processing CSV uploads (`app/api/import/route.ts`)
  - [ ] 7.6 Add data validation during import process
  - [ ] 7.7 Implement bulk insert functionality for imported data
  - [ ] 7.8 Add progress indicators and error reporting for import process
  - [ ] 7.9 Create preview functionality to validate import before processing
  - [ ] 7.10 Test import with sample CSV data from Airtable export

- [ ] 8.0 PWA Configuration & Deployment
  - [ ] 8.1 Install PWA dependencies (`next-pwa` or workbox libraries)
  - [ ] 8.2 Create PWA manifest.json with "Tea High" configuration (`public/manifest.json`)
  - [ ] 8.3 Configure service worker for offline caching (`public/sw.js`)
  - [ ] 8.4 Set up standalone display mode for mobile and flexible for desktop
  - [ ] 8.5 Update layout.tsx with PWA metadata and manifest link
  - [ ] 8.6 Configure Vercel deployment settings and environment variables
  - [ ] 8.7 Test PWA installation and offline functionality on mobile devices
  - [ ] 8.8 Optimize for mobile performance and touch interactions
  - [ ] 8.9 Deploy to Vercel and verify production functionality
  - [ ] 8.10 Test "Add to Home Screen" functionality on iPhone
