import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref([])

  async function fetchBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')

    if (error) {
      console.error('Buchungen konnten nicht geladen werden:', error.message)
      return
    }

    bookings.value = data
  }

  async function hasBookingConflict(vehicleId, start, end) {
    const { data: existingBookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('vehicle_id', vehicleId)

    if (error) {
      return { hasConflict: true, message: error.message }
    }

    const newStart = new Date(start)
    const newEnd = new Date(end)

    const isConflicting = existingBookings.some((booking) => {
      const bookingStart = new Date(booking.start)
      const bookingEnd = new Date(booking.end_date)
      return bookingStart < newEnd && bookingEnd > newStart
    })

    return { hasConflict: isConflicting }
  }

  async function createBooking(bookingData) {
    const conflictCheck = await hasBookingConflict(
      bookingData.vehicle_id,
      bookingData.start,
      bookingData.end_date
    )

    if (conflictCheck.hasConflict) {
      return { success: false, message: 'Dieses Fahrzeug ist im gewählten Zeitraum bereits gebucht.' }
    }

    const { error } = await supabase
      .from('bookings')
      .insert([bookingData])

    if (error) {
      return { success: false, message: error.message }
    }

    await fetchBookings()
    return { success: true }
  }

  function isBookingConfirmed(bookingId) {
    const booking = bookings.value.find(b => b.id === bookingId)
    return booking?.status === 'confirmed'
  }

  return { bookings, fetchBookings, hasBookingConflict, createBooking, isBookingConfirmed }
})