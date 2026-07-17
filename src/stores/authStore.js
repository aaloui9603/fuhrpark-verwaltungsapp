import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  async function loginWithCredentials(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return { success: false, message: error.message }
    }

    user.value = data.user
    return { success: true }
  }

  function logout() {
    supabase.auth.signOut()
    user.value = null
  }

  return { user, loginWithCredentials, logout }
})