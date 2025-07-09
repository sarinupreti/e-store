<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Initialize auth on app mount
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initAuth()
})

// Initialize cart from localStorage
const cartStore = useCartStore()
onMounted(() => {
  cartStore.loadFromLocalStorage()
})
</script>