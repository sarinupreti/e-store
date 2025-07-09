<template>
  <div class="product-detail">
    <div class="container">
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="error" class="alert alert-error">
        {{ error }}
      </div>
      
      <div v-else-if="product" class="product-content">
        <div class="product-gallery">
          <div class="main-image">
            <img :src="selectedImage" :alt="product.title" />
          </div>
          <div class="thumbnail-list">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = image"
              class="thumbnail-item"
              :class="{ active: selectedImage === image }"
            >
              <img :src="image" :alt="`${product.title} ${index + 1}`" />
            </button>
          </div>
        </div>
        
        <div class="product-details">
          <div class="product-header">
            <h1>{{ product.title }}</h1>
            <p class="product-brand">by {{ product.brand }}</p>
          </div>
          
          <div class="product-rating">
            <span class="stars">{{ getStars(product.rating) }}</span>
            <span class="rating-value">({{ product.rating }} out of 5)</span>
          </div>
          
          <div class="product-price-section">
            <div v-if="product.discountPercentage > 0" class="discount-info">
              <span class="original-price">${{ product.price.toFixed(2) }}</span>
              <span class="discount-badge">-{{ Math.round(product.discountPercentage) }}%</span>
            </div>
            <div class="current-price">${{ discountedPrice.toFixed(2) }}</div>
          </div>
          
          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>
          
          <div class="product-info-grid">
            <div class="info-item">
              <span class="info-label">Category:</span>
              <span class="info-value">{{ formatCategoryName(product.category) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Stock:</span>
              <span class="info-value" :class="{ 'low-stock': product.stock < 10 }">
                {{ product.stock }} items
              </span>
            </div>
          </div>
          
          <div class="product-actions">
            <div class="quantity-selector">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input v-model.number="quantity" type="number" min="1" :max="product.stock" />
              <button @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
            </div>
            
            <button @click="addToCart" class="btn btn-primary add-to-cart">
              Add to Cart
            </button>
            
            <button class="btn btn-outline wishlist-btn">
              ♡ Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      
      <section v-if="relatedProducts.length > 0" class="related-products">
        <h2>Related Products</h2>
        <div class="products-grid">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const route = useRoute()
const cartStore = useCartStore()
const { getProduct, getProductsByCategory } = useProducts()

const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const selectedImage = ref('')
const quantity = ref(1)
const loading = ref(true)
const error = ref<string | null>(null)

const productId = computed(() => Number(route.params.id))

const discountedPrice = computed(() => {
  if (!product.value) return 0
  const discount = (product.value.price * product.value.discountPercentage) / 100
  return product.value.price - discount
})

const getStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar
  
  return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars)
}

const formatCategoryName = (category: string) => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    // Reset quantity after adding
    quantity.value = 1
  }
}

// Fetch product data
onMounted(async () => {
  try {
    product.value = await getProduct(productId.value)
    selectedImage.value = product.value.thumbnail
    
    // Fetch related products from same category
    if (product.value.category) {
      const response = await getProductsByCategory(product.value.category, { limit: 4 })
      relatedProducts.value = response.products.filter(p => p.id !== productId.value)
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load product'
  } finally {
    loading.value = false
  }
})

// Update SEO meta
useHead(() => ({
  title: product.value?.title || 'Product Details',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'Product details'
    }
  ]
}))
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  background-color: #f9fafb;
  border-radius: var(--border-radius);
  overflow: hidden;
  aspect-ratio: 1;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.thumbnail-item {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: border-color 0.2s ease;
}

.thumbnail-item.active,
.thumbnail-item:hover {
  border-color: var(--primary-color);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.product-brand {
  color: var(--text-light);
  font-size: 1.125rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  color: #f59e0b;
  font-size: 1.25rem;
}

.rating-value {
  color: var(--text-light);
}

.product-price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.discount-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.original-price {
  color: var(--text-light);
  text-decoration: line-through;
  font-size: 1.25rem;
}

.discount-badge {
  background-color: var(--danger-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.product-description h3 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.product-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  color: var(--text-light);
  font-size: 0.875rem;
}

.info-value {
  font-weight: 500;
}

.low-stock {
  color: var(--danger-color);
}

.product-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.quantity-selector button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-color);
  transition: background-color 0.2s ease;
}

.quantity-selector button:hover:not(:disabled) {
  background-color: var(--light-color);
}

.quantity-selector button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-selector input {
  border: none;
  width: 50px;
  text-align: center;
  font-size: 1rem;
  padding: 0.5rem;
}

.add-to-cart {
  flex: 1;
}

.wishlist-btn {
  padding: 0.625rem 1rem;
}

.related-products {
  margin-top: 4rem;
}

.related-products h2 {
  margin-bottom: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .product-actions {
    flex-wrap: wrap;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .product-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>