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

async function createBooking(bookingData) {
const { error } = await supabase
.from('bookings')
.insert([bookingData])

if (error) {
return { success:false, message: error.message }
}
await fetchBookings() 
return { success: true }
}
return { bookings, fetchBookings, createBooking }
})

