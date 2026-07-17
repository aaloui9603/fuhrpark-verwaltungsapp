import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const role = ref(null)

  async function loginWithCredentials(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, message: error.message }
    }

    user.value = data.user

    const { data: employeeData, error: employeeError } = await supabase
      .from('employees')
      .select('role')
      .eq('email', email)
      .single()

    if (employeeError) {
      return { success: false, message: 'Rolle konnte nicht geladen werden.' }
    }

    role.value = employeeData.role

    return { success: true }
  }

  function logout() {
    supabase.auth.signOut()
    user.value = null
    role.value = null
  }

  return { user, role, loginWithCredentials, logout }
})