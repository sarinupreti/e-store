# Product Catalog Page - Design Mockup & Requirements

## 📋 Page Layout Mockup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRODUCT CATALOG PAGE                                                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  🔍 Search Bar                                          [Grid] [List] View                                                     │
│  ┌─────────────────────────────────────────────────────┐                                   │
│  │ Search products...                               🔍                                    │                                   │
│  └─────────────────────────────────────────────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                FILTERS                                                                                          │
│                                                                                                                                 │
│  Category: [All Categories ▼]    Price: [$0] ──●────── [$500]                                                             │
│                                                                                                                                 │
│  Brand: ☐ Apple  ☐ Samsung  ☐ Nike  ☐ Adidas                                                                                  │
│                                                                                                                                 │
│  Rating: ⭐⭐⭐⭐⭐ & up                                                                                                       │
│                                                                                                                                 │
│  Sort by: [Price: Low to High ▼]                         [Clear Filters]                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRODUCT GRID (2x2 shown)                                                                              │
│                                                                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────         │
│  │     [IMAGE]                │  │     [IMAGE]                 │  │     [IMAGE]                │  │     [IMA               │
│  │                            │  │                             │  │                            │  │                        │
│  │  Product Name              │  │  Product Name               │  │  Product Name              │  │  Product               │
│  │  Brand Name                │  │  Brand Name                 │  │  Brand Name                │  │  Brand N               │
│  │  ⭐⭐⭐⭐⭐ (4.5)         │  │  ⭐⭐⭐⭐⭐ (4.2)          │  │  ⭐⭐⭐⭐⭐ (4.8)         │  │  ⭐⭐⭐⭐⭐           │
│  │  $29.99                    │  │  $49.99                     │  │  $19.99                    │  │  $39.99                │
│  │  [Add to Cart]             │  │  [Add to Cart]              │  │  [Add to Cart]             │  │  [Add to               │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────         │
│                                                                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────         │
│  │     [IMAGE]                │  │     [IMAGE]                 │  │     [IMAGE]                │  │     [IMA               │
│  │                            │  │                             │  │                            │  │                        │
│  │  Product Name              │  │  Product Name               │  │  Product Name              │  │  Product               │
│  │  Brand Name                │  │  Brand Name                 │  │  Brand Name                │  │  Brand N               │
│  │  ⭐⭐⭐⭐⭐ (4.1)         │  │  ⭐⭐⭐⭐⭐ (4.7)          │  │  ⭐⭐⭐⭐⭐ (4.3)         │  │  ⭐⭐⭐⭐⭐           │
│  │  $24.99                    │  │  $34.99                     │  │  $44.99                    │  │  $54.99                │
│  │  [Add to Cart]             │  │  [Add to Cart]              │  │  [Add to Cart]             │  │  [Add to               │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              PAGINATION                                                                                         │
│                                                                                                                                 │
│         [< Previous]  [1] [2] [3] ... [10]  [Next >]                                                                            │
│                                                                                                                                 │
│                    Showing 1-12 of 120 products                                                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📱 Mobile Layout Mockup

```
┌─────────────────────────┐
│    PRODUCT CATALOG                       │
└─────────────────────────┘

┌─────────────────────────┐
│  🔍 Search products...                  │
│                      🔍                 │
└─────────────────────────┘

┌─────────────────────────┐
│    [🎛️ Filters]                          │
│                                          │
│  [Grid] [List]                           │
└─────────────────────────┘

┌─────────────────────────┐
│       [IMAGE]                            │
│                                          │
│    Product Name                          │
│    Brand Name                            │
│    ⭐⭐⭐⭐⭐ (4.5)                     │
│    $29.99                                │
│    [Add to Cart]                         │
└─────────────────────────┘

┌─────────────────────────┐
│       [IMAGE]                            │
│                                          │
│    Product Name                          │
│    Brand Name                            │
│    ⭐⭐⭐⭐⭐ (4.2)                     │
│    $49.99                                │
│    [Add to Cart]                         │
└─────────────────────────┘

┌─────────────────────────┐
│     [Load More]                          │
└─────────────────────────┘
```

## 🎨 List View Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LIST VIEW                                                                                         │
│                                                                                                                                │
│  ┌─────────┐  Product Name                                        $29.99                                                │
│  │ [IMAGE]       │  Brand Name                                                                                                │
│  │               │  ⭐⭐⭐⭐⭐ (4.5)                                                                                         │
│  │               │  Short product description here...                                                                         │
│  └─────────┘  [Add to Cart]                                                                                             │
│                                                                                                                                │
│  ┌─────────┐  Product Name                                        $49.99                                                │
│  │ [IMAGE]       │  Brand Name                                                                                                │
│  │               │  ⭐⭐⭐⭐⭐ (4.2)                                                                                         │
│  │               │  Short product description here...                                                                         │
│  └─────────┘  [Add to Cart]                                                                                             │
│                                                                                                                                │
│  ┌─────────┐  Product Name                                        $19.99                                                │
│  │ [IMAGE]       │  Brand Name                                                                                                │
│  │               │  ⭐⭐⭐⭐⭐ (4.8)                                                                                         │
│  │               │  Short product description here...                                                                         │
│  └─────────┘  [Add to Cart]                                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Implementation Requirements

### 1. Search Functionality
- **Input**: Search bar with placeholder "Search products..."
- **Debouncing**: 500ms delay before API call
- **Features**:
  - Search by product title and description
  - Clear search button (X)
  - Search suggestions (optional)
  - URL parameter: `?q=search-term`

### 2. Category Filter
- **Type**: Dropdown select
- **Options**: "All Categories" + categories from API
- **Behavior**: Filter products by selected category
- **URL parameter**: `?category=category-name`

### 3. Price Range Filter
- **Type**: Range slider or two input fields (min/max)
- **Range**: $0 - $500 (or dynamic based on products)
- **Behavior**: Filter products within price range
- **URL parameters**: `?minPrice=0&maxPrice=100`

### 4. Brand Filter
- **Type**: Checkbox list
- **Options**: All unique brands from products
- **Behavior**: Multiple selection allowed
- **URL parameter**: `?brands=apple,samsung,nike`

### 5. Rating Filter
- **Type**: Star rating selector
- **Options**: 5⭐ & up, 4⭐ & up, 3⭐ & up, etc.
- **Behavior**: Show products with rating >= selected
- **URL parameter**: `?minRating=4`

### 6. Sort Options
- **Type**: Dropdown select
- **Options**:
  - Price: Low to High
  - Price: High to Low
  - Rating: High to Low
  - Name: A to Z
  - Newest First
- **URL parameter**: `?sortBy=price&order=asc`

### 7. View Toggle
- **Type**: Two buttons (Grid/List)
- **Grid**: 4 columns desktop, 2 mobile
- **List**: Full width with horizontal layout
- **Persistence**: Remember user preference

### 8. Pagination
- **Type**: Page numbers with Previous/Next
- **Display**: "Showing 1-12 of 120 products"
- **URL parameter**: `?page=2`
- **Alternative**: Infinite scroll with "Load More" button

### 9. Loading States
- **Initial Load**: Skeleton loading cards
- **Search**: Loading spinner in search bar
- **Filter Changes**: Overlay loading on grid
- **Pagination**: Loading state on new page

### 10. Error Handling
- **Network Error**: Retry button with error message
- **No Results**: "No products found" with suggestions
- **API Error**: User-friendly error message

## 📱 Responsive Design

### Desktop (>1024px)
- 4 columns grid
- Full filter sidebar
- All features visible

### Tablet (768px - 1024px)
- 3 columns grid
- Collapsible filters
- Horizontal scroll for filters

### Mobile (<768px)
- 1-2 columns grid
- Modal filters (triggered by "🎛️ Filters" button)
- Infinite scroll preferred over pagination

## 🎯 User Experience Features

### Filter Combinations
- Multiple filters should work together (AND logic)
- Clear all filters button
- Active filter indicators/badges
- Filter count display

### URL State Management
- All filter states in URL parameters
- Shareable URLs
- Browser back/forward support
- Bookmark-friendly

### Performance Optimizations
- Debounced search input
- Cached API responses
- Lazy loading images
- Virtual scrolling for large lists

## 🧪 Testing Checklist

- [ ] Search functionality works correctly
- [ ] All filters work individually and combined
- [ ] Sort options work correctly
- [ ] Pagination/infinite scroll works
- [ ] Grid/List view toggle works
- [ ] Mobile responsive design
- [ ] Loading states display properly
- [ ] Error handling works
- [ ] URL parameters work correctly
- [ ] Browser back/forward navigation works
- [ ] Add to cart functionality works
- [ ] Performance is acceptable with many products

## 🎨 Styling Guidelines

### Colors
- Use existing CSS variables from `/assets/css/main.css`
- Primary: `var(--primary-color)`
- Text: `var(--text-color)`
- Borders: `var(--border-color)`

### Components
- Reuse existing utility classes
- Follow established card design pattern
- Use consistent spacing and typography
- Maintain design consistency with other pages

### Animations
- Smooth transitions for filter changes
- Hover effects on product cards
- Loading animations
- Fade-in effects for new content
