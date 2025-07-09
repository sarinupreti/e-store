<template>
  <div class="dashboard-overview">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>Total Sales</h3>
          <p class="stat-value">$12,345</p>
          <p class="stat-change positive">+12.5%</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🛍️</div>
        <div class="stat-content">
          <h3>Orders</h3>
          <p class="stat-value">1,234</p>
          <p class="stat-change positive">+8.2%</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>Customers</h3>
          <p class="stat-value">567</p>
          <p class="stat-change positive">+15.3%</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-content">
          <h3>Products</h3>
          <p class="stat-value">89</p>
          <p class="stat-change neutral">0%</p>
        </div>
      </div>
    </div>
    
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h2>Recent Orders</h2>
        <div class="orders-list">
          <div class="order-item">
            <div class="order-info">
              <p class="order-id">#ORD-001</p>
              <p class="order-customer">John Doe</p>
            </div>
            <div class="order-amount">$299.99</div>
            <div class="order-status">
              <span class="status-badge processing">Processing</span>
            </div>
          </div>
          
          <div class="order-item">
            <div class="order-info">
              <p class="order-id">#ORD-002</p>
              <p class="order-customer">Jane Smith</p>
            </div>
            <div class="order-amount">$159.99</div>
            <div class="order-status">
              <span class="status-badge shipped">Shipped</span>
            </div>
          </div>
          
          <div class="order-item">
            <div class="order-info">
              <p class="order-id">#ORD-003</p>
              <p class="order-customer">Bob Johnson</p>
            </div>
            <div class="order-amount">$89.99</div>
            <div class="order-status">
              <span class="status-badge delivered">Delivered</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <NuxtLink to="/dashboard/products" class="action-item">
            <div class="action-icon">📦</div>
            <span>Manage Products</span>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/orders" class="action-item">
            <div class="action-icon">📋</div>
            <span>View Orders</span>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/customers" class="action-item">
            <div class="action-icon">👥</div>
            <span>Customer List</span>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/analytics" class="action-item">
            <div class="action-icon">📊</div>
            <span>Analytics</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <div class="dashboard-card">
      <h2>Sales Chart</h2>
      <div class="chart-placeholder">
        <p>📈 Chart visualization would go here</p>
        <p class="chart-note">In a real application, this would show sales trends over time</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>

<style scoped>
.dashboard-overview {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.stat-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-color);
  border-radius: 50%;
}

.stat-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-light);
  font-size: 0.875rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.25rem 0;
}

.stat-change {
  font-size: 0.875rem;
  margin: 0;
}

.stat-change.positive {
  color: var(--success-color);
}

.stat-change.negative {
  color: var(--danger-color);
}

.stat-change.neutral {
  color: var(--text-light);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.dashboard-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.dashboard-card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.order-info {
  flex: 1;
}

.order-id {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: var(--text-color);
}

.order-customer {
  margin: 0;
  color: var(--text-light);
  font-size: 0.875rem;
}

.order-amount {
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 1rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.processing {
  background-color: #fef3c7;
  color: #92400e;
}

.status-badge.shipped {
  background-color: #dbeafe;
  color: #1e40af;
}

.status-badge.delivered {
  background-color: #d1fae5;
  color: #065f46;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  color: var(--text-color);
}

.action-item:hover {
  background-color: var(--light-color);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.action-icon {
  font-size: 1.5rem;
}

.chart-placeholder {
  text-align: center;
  padding: 3rem;
  background-color: var(--light-color);
  border-radius: var(--border-radius);
  color: var(--text-light);
}

.chart-placeholder p:first-child {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.chart-note {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>