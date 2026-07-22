import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import { useBookingStore } from './bookingStore'

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

  return { createTrip }
})