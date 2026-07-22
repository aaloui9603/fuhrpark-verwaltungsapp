import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import { useBookingStore } from './bookingStore'
import { ref } from 'vue'

export const useTripStore = defineStore('trip', () => {
  const bookingStore = useBookingStore()

  async function createTrip(bookingId, kmStart, kmEnd, date) {
    const confirmed = bookingStore.isBookingConfirmed(bookingId)

    if (!confirmed) {
      return { success: false, message: 'Der Trip konnte nicht erfasst werden.' }
    }

    const { error } = await supabase.from('trips').insert({
      booking_id: bookingId,
      km_start: kmStart,
      km_end: kmEnd,
      date: date
    })

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: 'Trip erfolgreich erfasst.' }
  }

  const trips = ref([])

async function fetchTripsForVehicle(vehicleId) {
  const { data, error } = await supabase
    .from('trips')
    .select('*, bookings(vehicle_id)')
    .eq('bookings.vehicle_id', vehicleId)
    .order('date', { ascending: false })

  if (error) {
    console.error('Historie konnte nicht geladen werden:', error.message)
    return
  }

  trips.value = data
}
  return { createTrip, trips, fetchTripsForVehicle }
})