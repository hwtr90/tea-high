# Product Requirements Document: Tea High App

## Introduction/Overview

Tea High is a personal PWA (Progressive Web App) tea tracking application designed to help tea enthusiasts manage their collection, record tasting experiences, and discover patterns in their preferences. Built with Next.js + TypeScript, Supabase backend, and deployed on Vercel, the app enables users to maintain an accurate inventory of their tea collection while capturing detailed tasting notes and brewing information.

**Problem Statement:** Tea lovers often struggle to keep track of their growing collections, leading to duplicate purchases of teas they didn't enjoy, forgotten brewing parameters for favorites, and missed opportunities to discover new teas based on their established preferences.

**Goal:** Create a mobile-first tea tracking system that enables daily tea decision-making, prevents duplicate purchases of disliked teas, and helps users maintain an organized, searchable tea collection.

## Goals

1. **Primary Goal:** Enable users to add new tea purchases with complete details and record comprehensive tasting notes after trying teas
2. **Inventory Management:** Maintain accurate real-time inventory of in-stock vs. out-of-stock teas
3. **Decision Support:** Provide quick access to tea collection data for daily brewing decisions
4. **Pattern Discovery:** Help users identify trends in tea types, origins, and suppliers they prefer
5. **Mobile Optimization:** Deliver a seamless mobile-first experience that works equally well on desktop

## User Stories

### Priority 1: Recording Detailed Tasting Notes
- As a tea enthusiast, I want to record comprehensive tasting notes (dry leaf aroma, wet leaf aroma, flavor impressions) so I can remember what I liked about each tea and make informed future purchases.

### Priority 2: Discovering Tea Preferences  
- As a data-driven tea drinker, I want to see patterns in my preferences (favorite suppliers, regions, tea types) so I can discover new teas I'm likely to enjoy.

### Priority 3: Quick Stock Management
- As a tea lover, I want to quickly see what teas I have in stock and mark teas as consumed so I can decide what to brew today and keep my inventory current.

### Priority 4: Purchase Decision Support
- As a tea buyer, I want to check my past ratings and notes before purchasing so I can avoid buying teas I didn't like and find similar teas to ones I loved.

## Functional Requirements

### Core Tea Data Management
1. **Tea Entry Creation:** The system must allow users to create tea records with all required fields: name, type, subtype, supplier, rating, tasting notes, supplier description, stock status, brewing notes, harvest date, origin, elevation, and purchase date.

2. **Stock Status Toggle:** The system must provide a quick toggle to mark teas as in-stock or out-of-stock from any view.

3. **Rating System:** The system must implement a 10-point numeric rating system that is easily selectable and filterable.

4. **Comprehensive Tasting Notes:** The system must provide structured fields for:
   - Dry leaf aroma
   - Wet leaf aroma  
   - Flavor/taste impressions

5. **Detailed Brewing Notes:** The system must capture brewing parameters:
   - Water temperature (°F)
   - Tea amount (grams)
   - Steep time (seconds)
   - Number of steeps/infusions

### Form Field Specifications
6. **Input Field Types:** The system must implement specific field types for optimal user experience:
   - **Tea Name:** Single-line text field
   - **Tea Type:** Dropdown select with options: white, green, oolong, black, pu-erh (ripe), pu-erh (raw), blends
   - **Supplier:** Dropdown select with ability to add new suppliers dynamically (suppliers will be linked entities for filtering purposes, but no additional supplier profile data required)
   - **Rating:** 10-point numeric selector (1-10 scale)
   - **Tasting Notes:** Three separate text fields:
     - Dry leaf aroma (text field)
     - Wet leaf aroma (text field)  
     - Taste/flavor impressions (text field)
   - **Supplier Description:** Multi-line text area
   - **Brewing Parameters:** Four separate text fields:
     - Temperature (°F) - numeric input
     - Amount (grams) - numeric input
     - Steep time (seconds) - numeric input
     - Number of steeps - numeric input
   - **Harvest Date:** Two optional text fields:
     - Season (optional text field: Spring, Summer, Fall, Winter)
     - Year (optional numeric input)

### Search and Filtering
7. **Basic Search:** The system must provide search functionality across tea names.

8. **Filter by Category:** The system must allow filtering by:
   - Tea type (white, green, oolong, black, pu-erh ripe, pu-erh raw, blends)
   - Supplier (clickable from tea entries)
   - Rating
   - Stock status (in-stock/out-of-stock)

9. **Sortable Views:** The system must allow sorting by name, rating, type, harvest date, and purchase date.

### Mobile-First Interface
10. **Responsive Design:** The system must provide an optimized mobile interface that works seamlessly on iPhone and scales appropriately for desktop use.

11. **Touch-Friendly Controls:** All interactive elements must be sized and spaced appropriately for touch interaction.

12. **Compact Default View:** The system must display tea entries in a scannable, compact format by default with option to expand for full details.

### Data Import
13. **CSV Import:** The system must support importing existing tea data from CSV format into the Supabase database.

### PWA Functionality
14. **Progressive Web App:** The system must implement PWA functionality with:
   - App name: "Tea High"
   - Standalone display mode on mobile (hiding browser UI)
   - Flexible display mode on desktop (browser or standalone)
   - Service worker for basic offline caching
   - "Add to Home Screen" capability

## Non-Goals (Out of Scope)

### Phase 1 Exclusions
- **Photo Upload:** Image capture and storage functionality (planned for future release)
- **CSV Export:** Data export functionality (planned for future release, not MVP priority)
- **Complex Multi-Filter Combinations:** Advanced filtering with multiple simultaneous criteria
- **Advanced Analytics Dashboard:** Trend visualization and detailed preference analytics  
- **Multi-Year Harvest Tracking:** Separate entries for same tea across different harvest years
- **Origin Auto-Completion:** Hierarchical origin structure with automatic region/country linking
- **Social Features:** Sharing teas or ratings with other users
- **Commercial Features:** Integration with tea retailers or purchase tracking
- **Offline Sync:** Complex offline functionality beyond basic PWA caching

## Design Considerations

### Mobile-First Approach
- **Primary Interface:** Designed for iPhone usage with touch-friendly controls
- **Information Hierarchy:** Most important data (name, type, rating, stock status) visible in compact view
- **Expandable Details:** Secondary information (tasting notes, brewing parameters) accessible via expand/detail view
- **Quick Actions:** Stock toggle and rating changes accessible with minimal taps

### User Experience
- **Scannable Layout:** Tea list should be easily scannable for quick decision-making
- **Progressive Disclosure:** Show essential information first, detailed information on demand
- **Consistent Interaction Patterns:** Unified approach to filtering, sorting, and editing across all views

## Technical Considerations

### Technology Stack
- **Frontend:** Next.js with TypeScript for type safety and optimal performance
- **Backend:** Supabase for database, authentication, and real-time functionality
- **Deployment:** Vercel for seamless CI/CD and global CDN
- **PWA Features:** Service worker for basic offline functionality and app-like experience

### Database Design
- **Tea Schema:** Comprehensive data model supporting all required fields with appropriate indexing for filtering and search
- **Import System:** CSV import functionality for migrating existing data
- **Data Validation:** TypeScript types and database constraints to ensure data integrity

### Performance Requirements
- **Mobile Performance:** Fast load times on mobile networks
- **Search Response:** Sub-second search and filter results
- **Offline Capability:** Basic PWA functionality for viewing cached data

## Success Metrics

### Primary Success Indicators
1. **Daily Usage:** User opens and interacts with the app daily for tea selection decisions
2. **Collection Accuracy:** User maintains accurate inventory with regular stock status updates  
3. **Preference Discovery:** User identifies and explores new tea types/suppliers based on historical data patterns

### Secondary Metrics
- **Data Completeness:** Percentage of tea entries with complete tasting notes and ratings
- **Feature Adoption:** Usage rates for filtering, search, and rating features
- **Mobile Usage:** Percentage of interactions occurring on mobile devices

## Implementation Notes

### Resolved Requirements
- **Harvest Date:** Implemented as two optional fields (season and year)
- **Supplier Management:** Suppliers as linked entities for filtering, with easy add-new functionality during tea entry
- **Export Functionality:** CSV export capability planned for future release (not MVP priority)
- **Data Migration:** Existing data in Airtable will be exported to CSV and imported to Supabase with matching field names

### PWA Configuration Requirements
- **App Name:** "Tea High"
- **Display Mode:** 
  - Mobile: Standalone mode (full app experience, hiding browser UI)
  - Desktop: Browser or standalone mode (flexible)
- **App Icon:** To be configured later in development
- **Theme Colors:** To be defined later in development

## Future Roadmap Considerations

While not part of MVP scope, these features should be considered in the technical architecture:

- **Photo Storage:** Plan database schema to accommodate future image fields with automatic image compression/resizing on upload for space efficiency (reference images only)
- **CSV Export:** Data export functionality for user data portability
- **Analytics Engine:** Design data structure to support future trend analysis features  
- **Multi-Harvest Support:** Consider how current schema might extend to support multiple harvest years per tea
- **Advanced Filtering:** Ensure database indexing supports future complex query requirements
