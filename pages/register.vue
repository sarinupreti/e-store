<template>
  <div class="auth-form">
    <h2>Create Account</h2>
    <p class="auth-subtitle">Join us today! Create your account to start shopping.</p>
    
    <div class="alert alert-warning">
      <strong>Note:</strong> Registration is not available in demo mode. Please use the login page with demo credentials.
    </div>
    
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="firstName" class="form-label">First Name</label>
        <input
          id="firstName"
          v-model="formData.firstName"
          type="text"
          class="form-input"
          placeholder="Enter your first name"
          required
          disabled
        />
      </div>
      
      <div class="form-group">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          id="lastName"
          v-model="formData.lastName"
          type="text"
          class="form-input"
          placeholder="Enter your last name"
          required
          disabled
        />
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="form-input"
          placeholder="Enter your email"
          required
          disabled
        />
      </div>
      
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          v-model="formData.username"
          type="text"
          class="form-input"
          placeholder="Choose a username"
          required
          disabled
        />
      </div>
      
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          class="form-input"
          placeholder="Create a password"
          required
          disabled
        />
      </div>
      
      <button type="submit" class="btn btn-primary" disabled>
        Create Account
      </button>
    </form>
    
    <div class="auth-footer">
      <p>Already have an account? <NuxtLink to="/login">Sign in</NuxtLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: ''
})

const handleRegister = () => {
  // Registration is disabled in demo
}
</script>

<style scoped>
.auth-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.auth-form form {
  margin-bottom: 1.5rem;
}

.auth-form .btn {
  width: 100%;
  padding: 0.875rem;
}

.auth-footer {
  text-align: center;
  color: var(--text-light);
}
</style>