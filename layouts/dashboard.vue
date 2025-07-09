<template>
  <div class="dashboard-layout">
    <aside class="dashboard-sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <NuxtLink to="/" class="sidebar-logo">
          <h2 v-if="!sidebarCollapsed">E-Store Admin</h2>
          <span v-else>E</span>
        </NuxtLink>
        <button @click="toggleSidebar" class="sidebar-toggle">
          <MenuIcon />
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <NuxtLink to="/dashboard" class="sidebar-link" :class="{ 'active': $route.path === '/dashboard' }">
          <DashboardIcon />
          <span v-if="!sidebarCollapsed">Dashboard</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/products" class="sidebar-link" :class="{ 'active': $route.path.includes('/dashboard/products') }">
          <ProductsIcon />
          <span v-if="!sidebarCollapsed">Products</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/orders" class="sidebar-link" :class="{ 'active': $route.path.includes('/dashboard/orders') }">
          <OrdersIcon />
          <span v-if="!sidebarCollapsed">Orders</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/customers" class="sidebar-link" :class="{ 'active': $route.path.includes('/dashboard/customers') }">
          <CustomersIcon />
          <span v-if="!sidebarCollapsed">Customers</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/analytics" class="sidebar-link" :class="{ 'active': $route.path.includes('/dashboard/analytics') }">
          <AnalyticsIcon />
          <span v-if="!sidebarCollapsed">Analytics</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/settings" class="sidebar-link" :class="{ 'active': $route.path.includes('/dashboard/settings') }">
          <SettingsIcon />
          <span v-if="!sidebarCollapsed">Settings</span>
        </NuxtLink>
      </nav>
    </aside>
    
    <div class="dashboard-main">
      <header class="dashboard-header">
        <div class="header-content">
          <h1>{{ pageTitle }}</h1>
          <div class="header-actions">
            <button class="notification-btn">
              <BellIcon />
              <span class="notification-badge">3</span>
            </button>
            <div class="user-menu">
              <button @click="toggleUserDropdown" class="user-button">
                <img v-if="user?.image" :src="user.image" :alt="user.firstName" class="user-avatar">
                <UserIcon v-else />
                <span v-if="!sidebarCollapsed">{{ user?.firstName || 'Admin' }}</span>
              </button>
              <div v-if="userDropdownOpen" class="dropdown-menu">
                <NuxtLink to="/profile" class="dropdown-item">Profile</NuxtLink>
                <NuxtLink to="/" class="dropdown-item">Back to Store</NuxtLink>
                <button @click="logout" class="dropdown-item">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main class="dashboard-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const route = useRoute()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const sidebarCollapsed = ref(false)
const userDropdownOpen = ref(false)

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard Overview'
  if (path.includes('products')) return 'Products Management'
  if (path.includes('orders')) return 'Orders'
  if (path.includes('customers')) return 'Customers'
  if (path.includes('analytics')) return 'Analytics'
  if (path.includes('settings')) return 'Settings'
  return 'Dashboard'
})

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
}

const logout = async () => {
  await authStore.logout()
}

// Icon Components
const MenuIcon = () => h('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('line', { x1: '3', y1: '12', x2: '21', y2: '12', 'stroke-width': '2' }),
  h('line', { x1: '3', y1: '6', x2: '21', y2: '6', 'stroke-width': '2' }),
  h('line', { x1: '3', y1: '18', x2: '21', y2: '18', 'stroke-width': '2' })
])

const DashboardIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('rect', { x: '3', y: '3', width: '7', height: '7', 'stroke-width': '2' }),
  h('rect', { x: '14', y: '3', width: '7', height: '7', 'stroke-width': '2' }),
  h('rect', { x: '14', y: '14', width: '7', height: '7', 'stroke-width': '2' }),
  h('rect', { x: '3', y: '14', width: '7', height: '7', 'stroke-width': '2' })
])

const ProductsIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('path', { d: 'M20 7H4L6 2H18L20 7Z', 'stroke-width': '2' }),
  h('path', { d: 'M20 7V20C20 21 19 22 18 22H6C5 22 4 21 4 20V7', 'stroke-width': '2' })
])

const OrdersIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('path', { d: 'M9 5H7C5 5 3 7 3 9V19C3 21 5 23 7 23H17C19 23 21 21 21 19V9C21 7 19 5 17 5H15', 'stroke-width': '2' }),
  h('path', { d: 'M9 5C9 3 11 1 13 1C15 1 17 3 17 5', 'stroke-width': '2' })
])

const CustomersIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('path', { d: 'M17 21V19C17 17 15 15 13 15H5C3 15 1 17 1 19V21', 'stroke-width': '2' }),
  h('path', { d: 'M23 21V19C23 17.5 22 16.5 21 16', 'stroke-width': '2' }),
  h('circle', { cx: '9', cy: '7', r: '4', 'stroke-width': '2' }),
  h('path', { d: 'M16 3C17.5 3.5 19 5 19 7C19 9 17.5 10.5 16 11', 'stroke-width': '2' })
])

const AnalyticsIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('line', { x1: '18', y1: '20', x2: '18', y2: '10', 'stroke-width': '2' }),
  h('line', { x1: '12', y1: '20', x2: '12', y2: '4', 'stroke-width': '2' }),
  h('line', { x1: '6', y1: '20', x2: '6', y2: '14', 'stroke-width': '2' })
])

const SettingsIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('circle', { cx: '12', cy: '12', r: '3', 'stroke-width': '2' }),
  h('path', { d: 'M12 1V6M12 18V23M4.2 4.2L7 7M17 17L19.8 19.8M1 12H6M18 12H23M4.2 19.8L7 17M17 7L19.8 4.2', 'stroke-width': '2' })
])

const BellIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('path', { d: 'M18 8C18 6.4 17.3 4.9 16.2 3.8C15.1 2.7 13.6 2 12 2C10.4 2 8.9 2.7 7.8 3.8C6.7 4.9 6 6.4 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z', 'stroke-width': '2' }),
  h('path', { d: 'M13.73 21C13.5 21.5 13.1 21.9 12.6 22.1C12.1 22.3 11.6 22.3 11.1 22.1C10.6 21.9 10.2 21.5 9.97 21', 'stroke-width': '2' })
])

const UserIcon = () => h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
  h('circle', { cx: '12', cy: '7', r: '4', 'stroke-width': '2' }),
  h('path', { d: 'M4 21V17C4 15.9 4.9 15 6 15H18C19.1 15 20 15.9 20 17V21', 'stroke-width': '2' })
])

// Close dropdown on outside click
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.user-menu')) {
      userDropdownOpen.value = false
    }
  })
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dashboard-sidebar {
  width: 250px;
  background-color: var(--dark-color);
  color: white;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.dashboard-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #334155;
}

.sidebar-logo {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
}

.sidebar-logo h2 {
  margin: 0;
  font-size: 1.25rem;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease;
}

.sidebar-toggle:hover {
  background-color: #334155;
}

.sidebar-nav {
  padding: 1rem 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #cbd5e1;
  transition: all 0.2s ease;
  position: relative;
}

.sidebar-link:hover {
  background-color: #334155;
  color: white;
}

.sidebar-link.active {
  background-color: var(--primary-color);
  color: white;
}

.sidebar-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: white;
}

.dashboard-sidebar.collapsed .sidebar-link {
  justify-content: center;
}

.dashboard-sidebar.collapsed .sidebar-link span {
  display: none;
}

.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.dashboard-header {
  background-color: white;
  box-shadow: var(--shadow-sm);
  padding: 1.5rem 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease;
}

.notification-btn:hover {
  background-color: var(--light-color);
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--danger-color);
  color: white;
  font-size: 0.625rem;
  padding: 0.125rem 0.25rem;
  border-radius: 9999px;
  min-width: 1rem;
  text-align: center;
}

.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  color: var(--text-color);
  transition: background-color 0.2s ease;
}

.user-button:hover {
  background-color: var(--light-color);
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  overflow: hidden;
  z-index: 10;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  transition: background-color 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: var(--light-color);
  color: var(--primary-color);
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
}

@media (max-width: 768px) {
  .dashboard-sidebar {
    position: fixed;
    z-index: 100;
    height: 100vh;
    transform: translateX(-100%);
  }
  
  .dashboard-sidebar.collapsed {
    transform: translateX(0);
  }
  
  .dashboard-main {
    margin-left: 0;
  }
}
</style>