<script setup>
import { ref, computed } from 'vue'
import { useVehicleStore } from '../stores/vehicleStore'
import { useAuthStore } from '../stores/authStore'
import { useBookingStore } from '../stores/bookingStore'

const vehicleStore = useVehicleStore()
const authStore = useAuthStore()
const bookingStore = useBookingStore()

const purpose = ref('')
const start = ref('')
const end = ref('')
const selectedVehicleId = ref('')

const duration = computed(() => {
  if (!start.value || !end.value) {
    return null
  }
  const ms = new Date(end.value) - new Date(start.value)
  return ms / 1000 / 60 / 60
})

async function handleSubmit() {
  const result = await bookingStore.createBooking({
    vehicle_id: selectedVehicleId.value,
    employee_id: authStore.employeeId,
    start: start.value,
    end_date: end.value,
    purpose: purpose.value
  })

  if (result.success) {
    selectedVehicleId.value = ''
    start.value = ''
    end.value = ''
    purpose.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="vehicle">Fahrzeug</label>
    <select id="vehicle" v-model="selectedVehicleId">
      <option v-for="v in vehicleStore.vehicles" :key="v.id" :value="v.id">
        {{ v.make_model }} — {{ v.color }} - {{ v.licence_plate }}
      </option>
    </select>

    <label for="start">Start</label>
    <input id="start" type="datetime-local" v-model="start" />

    <label for="end">Ende</label>
    <input id="end" type="datetime-local" v-model="end" />

    <label for="purpose">Zweck</label>
    <input id="purpose" type="text" v-model="purpose" />

    <p v-if="duration">Dauer: {{ duration }} Stunden</p>

    <button type="submit">Buchung anlegen</button>
  </form>
</template>