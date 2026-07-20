<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useVehicleStore } from '../stores/vehicleStore'
import VehicleCard from '../components/VehicleCard.vue'
import AddVehicleForm from '../components/AddVehicleForm.vue'
import BookingForm from '../components/BookingForm.vue'

const authStore = useAuthStore()
const vehicleStore = useVehicleStore()

onMounted(() => {
  vehicleStore.fetchVehicles()
})
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="authStore.user">{{ authStore.user.email }}</p>

    <AddVehicleForm v-if="authStore.role === 'admin' || authStore.role === 'coordinator'" />

    <h2>Buchung anlegen</h2>
    <BookingForm />

    <h2>Fahrzeuge</h2>
    <VehicleCard
      v-for="v in vehicleStore.vehicles"
      :key="v.id"
      :vehicle="v"
      @delete="vehicleStore.deleteVehicle($event)"
    />
  </div>
</template>