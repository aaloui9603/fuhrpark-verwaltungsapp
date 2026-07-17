import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicles = ref([])

  async function fetchVehicles() {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')

    if (error) {
      console.error('Fahrzeuge konnten nicht geladen werden:', error.message)
      return
    }

    vehicles.value = data
  }

  async function addVehicle(vehicleData) {
    const { error } = await supabase
      .from('vehicles')
      .insert([vehicleData])

    if (error) {
      return { success: false, message: error.message }
    }

    await fetchVehicles()
    return { success: true }
  }

  return { vehicles, fetchVehicles, addVehicle }
})