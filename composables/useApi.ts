import type { ApiError } from '~/types'

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const apiFetch = async <T>(url: string, options: any = {}): Promise<T> => {
    try {
      const response = await $fetch<T>(`${baseURL}${url}`, {
        ...options,
        onResponseError({ response }) {
          if (response.status === 401) {
            const authStore = useAuthStore()
            authStore.logout()
          }
        }
      })
      
      return response
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.data?.message || error.message || 'An error occurred',
        status: error.status
      }
      throw apiError
    }
  }

  return {
    get: <T>(url: string, params?: any) => 
      apiFetch<T>(url, { method: 'GET', params }),
    
    post: <T>(url: string, body?: any) => 
      apiFetch<T>(url, { method: 'POST', body }),
    
    put: <T>(url: string, body?: any) => 
      apiFetch<T>(url, { method: 'PUT', body }),
    
    delete: <T>(url: string) => 
      apiFetch<T>(url, { method: 'DELETE' })
  }
}