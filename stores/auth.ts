import { defineStore } from 'pinia'
import type { User, LoginCredentials, AuthResponse } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false
  }),

  getters: {
    currentUser: (state) => state.user,
    authToken: (state) => state.token
  },

  actions: {
    async login(credentials: LoginCredentials) {
      try {
        const config = useRuntimeConfig()
        
        const response = await $fetch<AuthResponse>(`${config.public.apiBase}/auth/login`, {
          method: 'POST',
          body: credentials
        })

        this.setUser(response)
        this.setToken(response.token)
        
        // Store in cookie for SSR
        const authCookie = useCookie('auth-token', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        authCookie.value = response.token

        await navigateTo('/dashboard')
        return response
      } catch (error) {
        throw error
      }
    },

    async register(_userData: any) {
      // DummyJSON doesn't have a register endpoint, so we'll simulate it
      throw new Error('Registration not implemented - use existing users')
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      const authCookie = useCookie('auth-token')
      authCookie.value = null
      
      await navigateTo('/login')
    },

    async fetchCurrentUser() {
      if (!this.token) return null

      try {
        const config = useRuntimeConfig()
        
        const response = await $fetch<User>(`${config.public.apiBase}/auth/me`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.setUser(response)
        return response
      } catch (error) {
        this.logout()
        return null
      }
    },

    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    setToken(token: string) {
      this.token = token
    },

    async initAuth() {
      const authCookie = useCookie('auth-token')
      if (authCookie.value) {
        this.token = authCookie.value as string
        await this.fetchCurrentUser()
      }
    }
  }
})