<template>
  <div class="products-page">
    <div class="container">
      <div class="products-header">
        <h1>Products</h1>
        <p>Discover our wide range of products</p>
      </div>
      
      <!-- TODO: Implement filters and search -->
      <div class="products-controls">
        <div class="search-section">
          <div>
            <label for="product-search" class="form-label mb-1">Search Products</label>
            <div style="position: relative;">
              <input
                id="product-search"
                v-model="searchQuery"
                @input="onSearchInput"
                type="text"
                class="form-input"
                placeholder="Search by product title..."
                autocomplete="off"
                style="width: 100%;"
              />
              <button v-if="searchQuery" @click="clearSearch" class="btn btn-secondary" style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); padding: 0.25rem 0.75rem; font-size: 0.9rem;">Clear</button>
            </div>
            <div v-if="searching" class="text-muted mt-1" style="font-size: 0.95rem;">Searching...</div>
          </div>
          <div class="search-placeholder mt-2">
            <h3>�� Search Suggestions & Features</h3>
            <ul>
              <li>Search by product title</li>
              <li>Real-time search with debouncing</li>
              <li>Clear search functionality</li>
              <li>Search suggestions (future)</li>
            </ul>
          </div>
        </div>
        
        <div class="filters-section">
          <div class="mb-2">
            <label for="category-select" class="form-label mb-1">Category</label>
            <select
              id="category-select"
              v-model="selectedCategory"
              @change="onCategoryChange"
              class="form-input"
              style="width: 100%; margin-bottom: 1rem;"
            >
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat.charAt(0).toUpperCase() + cat.slice(1) }}</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="form-label mb-1">Price Range</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input
                type="number"
                class="form-input"
                style="width: 6rem;"
                min="0"
                v-model.number="minPrice"
                @input="onPriceChange"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                class="form-input"
                style="width: 6rem;"
                min="0"
                v-model.number="maxPrice"
                @input="onPriceChange"
                placeholder="Max"
              />
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label mb-1">Brand</label>
            <div style="max-height: 120px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 0.5rem; background: #f8fafc;">
              <div v-for="brand in brands" :key="brand" style="margin-bottom: 0.25rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" :value="brand" v-model="selectedBrands" @change="onBrandChange" />
                  <span>{{ brand }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label mb-1">Rating</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button
                v-for="star in [5,4,3,2,1]"
                :key="star"
                @click="selectRating(star)"
                :class="['btn', 'btn-outline', { 'btn-primary': minRating === star }]"
                style="padding: 0.25rem 0.75rem; font-size: 1rem; display: flex; align-items: center; gap: 0.25rem; border-width: 2px;"
              >
                <span style="color: #f59e0b;">{'★'.repeat(star)}</span>
                <span v-if="star !== 1" class="text-muted">&amp; up</span>
              </button>
              <button v-if="minRating" @click="clearRating" class="btn btn-secondary" style="padding: 0.25rem 0.75rem; font-size: 0.9rem;">Clear</button>
            </div>
          </div>
          <div class="mb-2">
            <label for="sort-select" class="form-label mb-1">Sort By</label>
            <select
              id="sort-select"
              v-model="sortOption"
              @change="onSortChange"
              class="form-input"
              style="width: 100%;"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="popularity-desc">Popularity</option>
            </select>
          </div>
          <div class="filters-placeholder mt-2">
            <h3>🎛️ Filters Missing</h3>
            <p>Implement the following filters:</p>
            <ul>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- TODO: Implement product grid with pagination -->
      <div class="products-content">
        <template v-if="loading">
          <div class="loading-container" style="min-height: 200px; display: flex; align-items: center; justify-content: center;">
            <span class="spinner" style="width: 2rem; height: 2rem; border: 4px solid #dbeafe; border-top: 4px solid #2563eb; border-radius: 50%; display: inline-block; animation: spin 1s linear infinite;"></span>
            <span class="ml-2">Loading products...</span>
          </div>
        </template>
        <template v-else-if="error">
          <div class="alert alert-error text-center p-2 mb-2">{{ error }}</div>
        </template>
        <template v-else>
          <div v-if="products.length > 0" class="grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 gap-3" style="@media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); } @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { grid-template-columns: 1fr; }">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>
          <div v-else class="text-center text-muted p-3">No products found.</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useProducts } from '~/composables/useProducts'
import ProductCard from '~/components/ProductCard.vue'

const { getAllProducts, searchProducts, getCategories, getProductsByCategory } = useProducts()
const products = ref([])
const loading = ref(true)
const error = ref<string | null>(null)

// Category, price, brand, rating, and sort filter state
const categories = ref<string[]>([])
const selectedCategory = ref('')
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const brands = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const minRating = ref<number | null>(null)
const sortOption = ref('')

// Search state
const searchQuery = ref('')
const searching = ref(false)
let searchTimeout: ReturnType<typeof setTimeout> | null = null


const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    let params: any = { limit: 20 }
    if (minPrice.value != null) params.minPrice = minPrice.value
    if (maxPrice.value != null) params.maxPrice = maxPrice.value
    if (selectedBrands.value.length > 0) params.brand = selectedBrands.value.join(',')
    if (minRating.value != null) params.minRating = minRating.value
    // Handle sort options
    if (sortOption.value) {
      if (sortOption.value.startsWith('price')) {
        params.sortBy = 'price'
        params.order = sortOption.value.endsWith('asc') ? 'asc' : 'desc'
      } else if (sortOption.value.startsWith('rating')) {
        params.sortBy = 'rating'
        params.order = sortOption.value.endsWith('asc') ? 'asc' : 'desc'
      } else if (sortOption.value === 'popularity-desc') {
        params.sortBy = 'popularity'
        params.order = 'desc'
      }
    }
    let response
    if (selectedCategory.value) {
      response = await getProductsByCategory(selectedCategory.value, params)
    } else {
      response = await getAllProducts(params)
    }
    products.value = response.products
    // Extract unique brands from loaded products
    const allBrands = response.products.map((p: any) => p.brand)
    brands.value = Array.from(new Set(allBrands)).sort()
  } catch (err: any) {
    error.value = err.message || 'Failed to load products.'
  } finally {
    loading.value = false
  }
}

const doSearch = async () => {
  if (!searchQuery.value) {
    await fetchProducts()
    searching.value = false
    return
  }
  searching.value = true
  error.value = null
  try {
    let params: any = { limit: 20 }
    if (minPrice.value != null) params.minPrice = minPrice.value
    if (maxPrice.value != null) params.maxPrice = maxPrice.value
    if (selectedBrands.value.length > 0) params.brand = selectedBrands.value.join(',')
    if (minRating.value != null) params.minRating = minRating.value
    // Handle sort options
    if (sortOption.value) {
      if (sortOption.value.startsWith('price')) {
        params.sortBy = 'price'
        params.order = sortOption.value.endsWith('asc') ? 'asc' : 'desc'
      } else if (sortOption.value.startsWith('rating')) {
        params.sortBy = 'rating'
        params.order = sortOption.value.endsWith('asc') ? 'asc' : 'desc'
      } else if (sortOption.value === 'popularity-desc') {
        params.sortBy = 'popularity'
        params.order = 'desc'
      }
    }
    let response
    if (selectedCategory.value) {
      // If a category is selected, search within that category
      response = await getProductsByCategory(selectedCategory.value, { ...params, q: searchQuery.value })
    } else {
      response = await searchProducts(searchQuery.value, params)
    }
    products.value = response.products
    // Extract unique brands from loaded products
    const allBrands = response.products.map((p: any) => p.brand)
    brands.value = Array.from(new Set(allBrands)).sort()
  } catch (err: any) {
    error.value = err.message || 'Failed to search products.'
  } finally {
    searching.value = false
  }
}

const onSearchInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    doSearch()
  }, 400)
}

const clearSearch = () => {
  searchQuery.value = ''
  doSearch()
}

const fetchCategories = async () => {
  try {
    categories.value = await getCategories()
  } catch (err) {
    // ignore category errors for now
  }
}

const onCategoryChange = () => {
  if (searchQuery.value) {
    doSearch()
  } else {
    fetchProducts()
  }
}

const onPriceChange = () => {
  if (searchQuery.value) {
    doSearch()
  } else {
    fetchProducts()
  }
}

const onBrandChange = () => {
  if (searchQuery.value) {
    doSearch()
  } else {
    fetchProducts()
  }
}

const selectRating = (star: number) => {
  minRating.value = star
  if (searchQuery.value) {
    doSearch()
  } else {
    fetchProducts()
  }
}

const clearRating = () => {
  minRating.value = null
  if (searchQuery.value) {
    doSearch()
  } else {
    fetchProducts()
  }
}

const onSortChange = () => {
  if (searchQuery.value) {
    doSearch()
  } else {
    fetchProducts()
  }
}

onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>

<style scoped>
.products-page {
  padding: 2rem 0;
}

.products-header {
  text-align: center;
  margin-bottom: 3rem;
}

.products-header h1 {
  margin-bottom: 0.5rem;
}

.products-header p {
  color: var(--text-light);
}

.products-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.search-section,
.filters-section {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.search-placeholder,
.filters-placeholder {
  background-color: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: var(--border-radius);
  padding: 1.5rem;
}

.search-placeholder h3,
.filters-placeholder h3 {
  color: #92400e;
  margin-bottom: 1rem;
}

.search-placeholder p,
.filters-placeholder p {
  color: #92400e;
  margin-bottom: 1rem;
}

.search-placeholder ul,
.filters-placeholder ul {
  color: #92400e;
  margin-left: 1.5rem;
}

.search-placeholder li,
.filters-placeholder li {
  margin-bottom: 0.5rem;
}

.products-content {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 3rem;
  box-shadow: var(--shadow-sm);
}

.products-grid-placeholder {
  background-color: #dbeafe;
  border: 1px solid #3b82f6;
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
}

.products-grid-placeholder h3 {
  color: #1e40af;
  margin-bottom: 1rem;
}

.products-grid-placeholder p {
  color: #1e40af;
  margin-bottom: 1rem;
}

.products-grid-placeholder ul {
  color: #1e40af;
  margin-left: 1.5rem;
  text-align: left;
}

.products-grid-placeholder li {
  margin-bottom: 0.5rem;
}

.implementation-hints {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #93c5fd;
  text-align: left;
}

.implementation-hints h4 {
  color: #1e40af;
  margin-bottom: 1rem;
}

.implementation-hints code {
  background-color: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #475569;
}

@media (max-width: 768px) {
  .products-controls {
    grid-template-columns: 1fr;
  }
}
</style>