<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useVehicleStore } from '../stores/vehicleStore'
import { useBookingStore } from '../stores/bookingStore'
import VehicleCard from '../components/VehicleCard.vue'
import AddVehicleForm from '../components/AddVehicleForm.vue'
import BookingForm from '../components/BookingForm.vue'
import AvailabilityCheck from '../components/AvailabilityCheck.vue'
import BookingCalendar from '../components/BookingCalendar.vue'


const authStore = useAuthStore()
const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()

onMounted(() => {
  vehicleStore.fetchVehicles()
  bookingStore.fetchBookings()
})
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="authStore.user">{{ authStore.user.email }}</p>

    <AddVehicleForm v-if="authStore.role === 'admin' || authStore.role === 'coordinator'" />

    <h2>Buchung anlegen</h2>
    <BookingForm />

    <h2>Verfügbarkeit prüfen</h2>
    <AvailabilityCheck />
    
    <h2>Kalender</h2>
    <BookingCalendar />

    <h2>Fahrzeuge</h2>
    <VehicleCard
      v-for="v in vehicleStore.vehicles"
      :key="v.id"
      :vehicle="v"
      @delete="vehicleStore.deleteVehicle($event)"
    />
  
  </div>
</template>