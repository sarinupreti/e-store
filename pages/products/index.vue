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
        <div class="view-toggle mb-3" style="display: flex; justify-content: flex-end; gap: 0.5rem;">
          <button
            class="btn"
            :class="{ 'btn-primary': viewMode === 'grid', 'btn-outline': viewMode !== 'grid' }"
            @click="setViewMode('grid')"
            aria-label="Grid view"
          >
            <span style="font-size: 1.2rem;">🔲</span> Grid
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': viewMode === 'list', 'btn-outline': viewMode !== 'list' }"
            @click="setViewMode('list')"
            aria-label="List view"
          >
            <span style="font-size: 1.2rem;">📋</span> List
          </button>
        </div>
        <template v-if="loading">
          <div>
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 gap-3">
              <div v-for="n in limit" :key="n" class="skeleton-card"></div>
            </div>
            <div v-else class="list-view">
              <div v-for="n in limit" :key="n" class="skeleton-list-item"></div>
            </div>
          </div>
        </template>
        <template v-else-if="error">
          <div class="alert alert-error text-center p-2 mb-2">
            {{ error }}
            <button class="btn btn-outline mt-2" @click="retryFetch">Retry</button>
          </div>
        </template>
        <template v-else>
          <div v-if="products.length > 0">
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 gap-3" style="@media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); } @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { grid-template-columns: 1fr; }">
              <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>
            <div v-else class="list-view" style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div v-for="product in products" :key="product.id" class="list-item" style="display: flex; gap: 2rem; align-items: center; background: #f8fafc; border-radius: var(--border-radius); box-shadow: var(--shadow-sm); padding: 1.5rem;">
                <img :src="product.thumbnail" :alt="product.title" style="width: 120px; height: 120px; object-fit: cover; border-radius: var(--border-radius); background: #fff;" />
                <div style="flex: 1;">
                  <h3 style="margin-bottom: 0.5rem;">{{ product.title }}</h3>
                  <div class="text-muted mb-1">Brand: {{ product.brand }}</div>
                  <div class="mb-1">{{ product.description }}</div>
                  <div class="mb-1">Category: {{ product.category }}</div>
                  <div class="mb-1">Rating: <span style="color: #f59e0b;">{{ product.rating }}</span></div>
                  <div class="mb-1">Stock: {{ product.stock }}</div>
                  <div class="mb-1">Price: <span style="font-weight: bold; color: var(--primary-color);">${{ product.price.toFixed(2) }}</span></div>
                  <NuxtLink :to="`/products/${product.id}`" class="btn btn-primary mt-1">View Details</NuxtLink>
                </div>
              </div>
            </div>
            <div class="pagination-controls mt-4" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
              <button class="btn btn-outline" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">&laquo; Prev</button>
              <span v-for="page in totalPages" :key="page">
                <button
                  class="btn"
                  :class="{ 'btn-primary': page === currentPage, 'btn-outline': page !== currentPage }"
                  style="min-width: 2.5rem; margin: 0 0.1rem;"
                  @click="goToPage(page)"
                  :disabled="page === currentPage"
                >
                  {{ page }}
                </button>
              </span>
              <button class="btn btn-outline" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next &raquo;</button>
            </div>
            <div class="text-center text-muted mt-2" v-if="totalProducts > 0">
              Showing {{ (skip + 1) }}-{{ Math.min(skip + limit, totalProducts) }} of {{ totalProducts }} products
            </div>
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
import { useStorage } from '@vueuse/core'

const { getAllProducts, searchProducts, getCategories, getProductsByCategory } = useProducts()
const products = ref([])
const loading = ref(true)
const error = ref<string | null>(null)
const totalProducts = ref(0)
const skip = ref(0)
const limit = ref(20)
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalProducts.value / limit.value) || 1)

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

// View mode state
const viewMode = useStorage('productViewMode', 'grid')

const setViewMode = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}


const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    let params: any = { limit: limit.value, skip: skip.value }
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
    totalProducts.value = response.total || 0
    skip.value = response.skip || 0
    limit.value = response.limit || 20
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
    let params: any = { limit: limit.value, skip: skip.value }
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
    totalProducts.value = response.total || 0
    skip.value = response.skip || 0
    limit.value = response.limit || 20
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

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  skip.value = (page - 1) * limit.value
  if (searchQuery.value) {
    doSearch()
  } else {
    fetchProducts()
  }
}

const retryFetch = () => {
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

.view-toggle {
  margin-bottom: 1.5rem;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.list-item {
  display: flex;
  gap: 2rem;
  align-items: center;
  background: #f8fafc;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
}

.list-item img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--border-radius);
  background: #fff;
}

.list-item h3 {
  margin-bottom: 0.5rem;
}

.list-item .text-muted {
  margin-bottom: 0.5rem;
}

.list-item .mb-1 {
  margin-bottom: 0.5rem;
}

.list-item .btn {
  margin-top: 0.5rem;
}

/* Skeleton loader styles */
.skeleton-card {
  height: 320px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  border-radius: var(--border-radius);
  animation: skeleton-loading 1.2s infinite linear;
}
.skeleton-list-item {
  height: 140px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  border-radius: var(--border-radius);
  animation: skeleton-loading 1.2s infinite linear;
  margin-bottom: 1.5rem;
}
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .products-controls {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .search-section,
  .filters-section {
    padding: 1rem;
    box-shadow: none;
  }
  .filters-section {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .view-toggle {
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .pagination-controls {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  .list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }
  .list-item img {
    width: 100%;
    max-width: 220px;
    height: auto;
    margin-bottom: 0.5rem;
  }
  .btn, .form-input {
    font-size: 1rem;
    min-height: 2.5rem;
  }
  .form-label {
    font-size: 1rem;
  }
  .filters-section .mb-2 {
    margin-bottom: 1rem;
  }
}
</style>