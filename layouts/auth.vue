<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-logo">
        <NuxtLink to="/">
          <h1>E-Store</h1>
        </NuxtLink>
      </div>
      <slot />
    </div>
    <div class="auth-background">
      <div class="auth-bg-content">
        <h2>Welcome to E-Store</h2>
        <p>Your trusted online shopping destination</p>
        <ul class="auth-features">
          <li>✓ Thousands of products</li>
          <li>✓ Best prices guaranteed</li>
          <li>✓ Fast & secure delivery</li>
          <li>✓ Easy returns</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: white;
}

.auth-logo {
  margin-bottom: 3rem;
}

.auth-logo h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
}

.auth-background {
  background: linear-gradient(135deg, var(--primary-color), #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
}

.auth-bg-content {
  max-width: 400px;
}

.auth-bg-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.auth-bg-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.auth-features {
  list-style: none;
}

.auth-features li {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }
  
  .auth-background {
    display: none;
  }
}
</style>