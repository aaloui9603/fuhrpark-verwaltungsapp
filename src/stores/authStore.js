import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const role = ref(null)
  const employeeId = ref(null)

  async function loginWithCredentials(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, message: error.message }
    }

    user.value = data.user

    const { data: employeeData, error: employeeError } = await supabase
      .from('employees')
      .select('role, id')
      .eq('email', email)
      .single()

    if (employeeError) {
      return { success: false, message: 'Rolle konnte nicht geladen werden.' }
    }

    role.value = employeeData.role
    employeeId.value = employeeData.id

    return { success: true }
  }

  async function initAuth() {
    const { data } = await supabase.auth.getSession()

    if (!data.session) {
      return
    }

    user.value = data.session.user

    const { data: employeeData, error: employeeError } = await supabase
      .from('employees')
      .select('role, id')
      .eq('email', data.session.user.email)
      .single()

    if (!employeeError) {
      role.value = employeeData.role
      employeeId.value = employeeData.id
    }
  }

  function logout() {
    supabase.auth.signOut()
    user.value = null
    role.value = null
    employeeId.value = null
  }

  return { user, role, employeeId, loginWithCredentials, initAuth, logout }
})