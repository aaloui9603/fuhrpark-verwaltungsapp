<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useVehicleStore } from '../stores/vehicleStore'

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

    <h2>Fahrzeuge (Test-Daten)</h2>
    <pre>{{ vehicleStore.vehicles }}</pre>
  </div>
</template>