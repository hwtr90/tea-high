# Tea Tracking App – Project Context

I’m building a **personal PWA tea-tracking app** using **Next.js + TypeScript**, with **Supabase** as the backend and **Vercel** for deployment. The purpose of the app is to help me keep track of the teas I own (both in stock and out of stock), rate them, and analyze trends in my personal preferences.

## High-Level Goals

- Track what teas I have in stock (for day-to-day brewing decisions).
- Record past teas I’ve tried and how I liked them.
- Analyze patterns in tea types, origins, and suppliers I tend to like.

## Core Features & Data Fields

Each **tea** should store the following:

- **Name**: The name of the tea.
- **Type**: One of: white, green, oolong, black, pu-erh (ripe), pu-erh (raw), or blends.
- **Subtype**: Optional (e.g. Dan Cong, Rou Gui, or Tie Guan Yin for Oolong teas).
- **Supplier**: The company I purchased it from. This should be clickable/filterable.
- **Photo**: A user-uploaded image of the tea, either from desktop or mobile (camera or photos).
- **Rating**: A personal numeric or star rating of the tea. This should be clickable/filterable.
- **Tasting notes**: Includes:
  - Smell of dry leaf
  - Smell of wet leaf
  - Taste/flavor impressions
- **Supplier description**: A longer text field for the marketing copy or description provided by the supplier.
- **In stock?**: Boolean for whether the tea is currently in my cupboard.
- **Brewing notes**:
  - Water temperature (°F)
  - Tea amount (grams)
  - Steep time (seconds)
  - Number of steeps/infusions
- **Harvest date**: Specific (e.g., March 2023) or seasonal (e.g., Spring 2023). Teas may appear in multiple harvest years. Each year should link to the same tea record but have separate tasting notes and ratings (e.g., Spring 2021 vs. Spring 2023 of the same tea).
- **Origin** A hierarchical structure:
  - Region (e.g., Yunnan)
  - Country (e.g., China)
  - Optional subregion or province
  - Ideally auto-linked so entering “Yunnan” autofills “China”
  - This should be clickable/filterable.
- **Elevation**: Elevation the tea was grown at (e.g., 600m, 1000m). This should be clickable/filterable.
- **Purchase date**: For freshness

## Desired Functionality

- **Filtering & Sorting**:
  - Clickable metadata (type, supplier, region, country).
  - Filter teas by any category, like all teas from one supplier or region.
  - Sort by type, harvest date, elevation, etc.
- **Display Preferences**:
  - Compact, scannable view for teas in stock.
  - Ability to expand or open a detail page for full info.
  - Most fields can be hidden by default and revealed when expanded.
- **Multi-Year Tracking**:
  - Some teas are purchased across multiple years.
  - Info like supplier, brew method, and origin is reused.
  - Year-specific tasting data should be tracked independently. Each harvest year should have separate tasting notes + rating.

## Personal Analytics Goals

- Help me discover trends in the kinds of teas I like (e.g., by region or supplier).
- Track preferences over time and avoid re-buying teas I didn’t enjoy.
- Enable better decision-making when shopping for new teas.

---

This is a personal tracking app, not for commercial or public use. The primary goal is usability, quick filtering, and simple day-to-day tea tracking.