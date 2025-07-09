<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
      </div>
      
      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="profile-card">
            <div class="profile-avatar">
              <img v-if="user?.image" :src="user.image" :alt="user.firstName" />
              <div v-else class="avatar-placeholder">
                {{ getInitials(user?.firstName, user?.lastName) }}
              </div>
            </div>
            <div class="profile-info">
              <h2>{{ user?.firstName }} {{ user?.lastName }}</h2>
              <p class="profile-email">{{ user?.email }}</p>
              <p class="profile-username">@{{ user?.username }}</p>
            </div>
          </div>
          
          <nav class="profile-nav">
            <button 
              @click="activeTab = 'personal'"
              :class="{ active: activeTab === 'personal' }"
              class="nav-item"
            >
              Personal Information
            </button>
            <button 
              @click="activeTab = 'orders'"
              :class="{ active: activeTab === 'orders' }"
              class="nav-item"
            >
              Order History
            </button>
            <button 
              @click="activeTab = 'wishlist'"
              :class="{ active: activeTab === 'wishlist' }"
              class="nav-item"
            >
              Wishlist
            </button>
            <button 
              @click="activeTab = 'settings'"
              :class="{ active: activeTab === 'settings' }"
              class="nav-item"
            >
              Settings
            </button>
          </nav>
        </div>
        
        <div class="profile-main">
          <div v-if="activeTab === 'personal'" class="tab-content">
            <div class="content-header">
              <h2>Personal Information</h2>
              <button class="btn btn-primary">Edit Profile</button>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <label>First Name</label>
                <p>{{ user?.firstName }}</p>
              </div>
              <div class="info-item">
                <label>Last Name</label>
                <p>{{ user?.lastName }}</p>
              </div>
              <div class="info-item">
                <label>Email</label>
                <p>{{ user?.email }}</p>
              </div>
              <div class="info-item">
                <label>Username</label>
                <p>{{ user?.username }}</p>
              </div>
              <div class="info-item">
                <label>Gender</label>
                <p>{{ user?.gender }}</p>
              </div>
              <div class="info-item">
                <label>Member Since</label>
                <p>January 2024</p>
              </div>
            </div>
          </div>
          
          <div v-else-if="activeTab === 'orders'" class="tab-content">
            <div class="content-header">
              <h2>Order History</h2>
            </div>
            
            <div class="orders-list">
              <div class="order-card">
                <div class="order-header">
                  <div class="order-id">#ORD-001</div>
                  <div class="order-date">March 15, 2024</div>
                  <div class="order-status">
                    <span class="status-badge delivered">Delivered</span>
                  </div>
                </div>
                <div class="order-items">
                  <p>3 items • $299.99</p>
                </div>
              </div>
              
              <div class="order-card">
                <div class="order-header">
                  <div class="order-id">#ORD-002</div>
                  <div class="order-date">March 10, 2024</div>
                  <div class="order-status">
                    <span class="status-badge processing">Processing</span>
                  </div>
                </div>
                <div class="order-items">
                  <p>1 item • $159.99</p>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else-if="activeTab === 'wishlist'" class="tab-content">
            <div class="content-header">
              <h2>Wishlist</h2>
            </div>
            
            <div class="wishlist-empty">
              <div class="empty-icon">♡</div>
              <h3>Your wishlist is empty</h3>
              <p>Save items you love for later</p>
              <NuxtLink to="/products" class="btn btn-primary">Browse Products</NuxtLink>
            </div>
          </div>
          
          <div v-else-if="activeTab === 'settings'" class="tab-content">
            <div class="content-header">
              <h2>Settings</h2>
            </div>
            
            <div class="settings-section">
              <h3>Notifications</h3>
              <div class="setting-item">
                <label class="setting-label">
                  <input type="checkbox" checked />
                  Email notifications
                </label>
              </div>
              <div class="setting-item">
                <label class="setting-label">
                  <input type="checkbox" />
                  SMS notifications
                </label>
              </div>
            </div>
            
            <div class="settings-section">
              <h3>Privacy</h3>
              <div class="setting-item">
                <label class="setting-label">
                  <input type="checkbox" checked />
                  Show my profile to other users
                </label>
              </div>
            </div>
            
            <div class="settings-section">
              <h3>Account</h3>
              <div class="setting-actions">
                <button class="btn btn-outline">Change Password</button>
                <button class="btn btn-danger">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const activeTab = ref('personal')

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return 'U'
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
}
</script>

<style scoped>
.profile-page {
  padding: 2rem 0;
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
}

.profile-header h1 {
  margin-bottom: 0.5rem;
}

.profile-header p {
  color: var(--text-light);
}

.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
}

.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.profile-avatar {
  margin-bottom: 1rem;
}

.profile-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 auto;
}

.profile-info h2 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.profile-email {
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

.profile-username {
  color: var(--text-light);
  font-size: 0.875rem;
}

.profile-nav {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.nav-item {
  display: block;
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-color);
}

.nav-item:last-child {
  border-bottom: none;
}

.nav-item:hover {
  background-color: var(--light-color);
}

.nav-item.active {
  background-color: var(--primary-color);
  color: white;
}

.profile-main {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.content-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.info-item label {
  display: block;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.info-item p {
  color: var(--text-light);
  margin: 0;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.order-id {
  font-weight: 600;
  color: var(--text-color);
}

.order-date {
  color: var(--text-light);
  font-size: 0.875rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.delivered {
  background-color: #d1fae5;
  color: #065f46;
}

.status-badge.processing {
  background-color: #fef3c7;
  color: #92400e;
}

.order-items {
  color: var(--text-light);
}

.wishlist-empty {
  text-align: center;
  padding: 3rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-light);
}

.wishlist-empty h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.wishlist-empty p {
  color: var(--text-light);
  margin-bottom: 2rem;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section h3 {
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.setting-item {
  margin-bottom: 1rem;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.setting-actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .setting-actions {
    flex-direction: column;
  }
}
</style>