import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import { useToastStore } from './toastStore'

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

  function checkInspectionDates() {
    const toastStore = useToastStore()
    const today = new Date()

    vehicles.value.forEach(vehicle => {
      if (!vehicle.inspection_date) {
        return
      }

      const inspection = new Date(vehicle.inspection_date)
      const diffMs = inspection - today
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (days <= 0) {
        toastStore.showToast(`${vehicle.make_model} (${vehicle.licence_plate}): TÜV überfällig!`, 'danger')
      } else if (days < 30) {
        toastStore.showToast(`${vehicle.make_model} (${vehicle.licence_plate}): TÜV in ${days} Tagen fällig`, 'warning')
      }
    })
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

  async function updateVehicle(id, updates) {
    const { error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', id)

    if (error) {
      return { success: false, message: error.message }
    }

    await fetchVehicles()
    return { success: true }
  }

  async function deleteVehicle(id) {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, message: error.message }
    }

    await fetchVehicles()
    return { success: true }
  }

  return { vehicles, fetchVehicles, checkInspectionDates, addVehicle, updateVehicle, deleteVehicle }
})