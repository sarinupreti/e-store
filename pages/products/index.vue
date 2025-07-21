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
          <div class="filters-placeholder">
            <h3>🎛️ Filters Missing</h3>
            <p>Implement the following filters:</p>
            <ul>
              <li>Category filter (dropdown)</li>
              <li>Price range filter (slider or inputs)</li>
              <li>Brand filter (checkbox list)</li>
              <li>Rating filter (star rating)</li>
              <li>Sort options (price, rating, popularity)</li>
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

const { getAllProducts, searchProducts } = useProducts()
const products = ref([])
const loading = ref(true)
const error = ref<string | null>(null)

// Search state
const searchQuery = ref('')
const searching = ref(false)
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await getAllProducts({ limit: 20 })
    products.value = response.products
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
    const response = await searchProducts(searchQuery.value, { limit: 20 })
    products.value = response.products
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

onMounted(fetchProducts)
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