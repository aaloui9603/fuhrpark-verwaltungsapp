```vue
<script setup>
import { ref, computed } from 'vue'
import { useVehicleStore } from '../stores/vehicleStore'
import { useAuthStore } from '../stores/authStore'
import { useBookingStore } from '../stores/bookingStore'

const vehicleStore = useVehicleStore()
const authStore = useAuthStore()
const bookingStore = useBookingStore()
const errorMessage = ref('')
const tripType = ref('business')

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
  errorMessage.value = ''
  const result = await bookingStore.createBooking({
    vehicle_id: selectedVehicleId.value,
    employee_id: authStore.employeeId,
    start: new Date(start.value).toISOString(),
    end_date: new Date(end.value).toISOString(),
    purpose: purpose.value,
    trip_type: tripType.value
  })
  
  if (result.success) {
    selectedVehicleId.value = ''
    start.value = ''
    end.value = ''
    purpose.value = ''
    tripType.value = 'business'

  } else {
    errorMessage.value = result.message
  }
}
</script>

<template>
<p v-if="errorMessage" class="error text-red-600">{{ errorMessage }}</p>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
    <div class="w-full">
    <label for="vehicle">Fahrzeug</label>
    <select id="vehicle" v-model="selectedVehicleId" class="w-full">
      <option v-for="v in vehicleStore.vehicles" :key="v.id" :value="v.id">
        {{ v.make_model }} — {{ v.color }} - {{ v.licence_plate }}
      </option>
    </select>
    </div>

    <div class="w-full">
      <label>Fahrtart</label>
      <select v-model="tripType" class="w-full">
        <option value="business">Dienstfahrt</option>
        <option value="private">Privatfahrt</option>
      </select>
    </div>

    <div class="w-full">
      <label for="start">Start</label>
      <input id="start" type="datetime-local" v-model="start" class="w-full" />
    </div>

    <div class="w-full">
      <label for="end">Ende</label>
      <input id="end" type="datetime-local" v-model="end" class="w-full" />
    </div>

    <div class="w-full md:col-span-2">
      <label for="purpose">Zweck</label>
      <input id="purpose" type="text" v-model="purpose" class="w-full" />
    </div>

    <p v-if="duration" class="w-full md:col-span-2">Dauer: {{ duration }} Stunden</p>

    <button type="submit" class="w-full md:col-span-2">Buchung anlegen</button>
  </form>   
</template>
