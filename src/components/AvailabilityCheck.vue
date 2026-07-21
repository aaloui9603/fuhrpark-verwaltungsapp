<!-- src/components/AvailabilityCheck.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useVehicleStore } from '../stores/vehicleStore'
import { useBookingStore } from '../stores/bookingStore'

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()

const start = ref('')
const end = ref('')

function hasConflictForVehicle(vehicleId) {
  const newStart = new Date(start.value)
  const newEnd = new Date(end.value)

  return bookingStore.bookings.some((booking) => {
    if (booking.vehicle_id !== vehicleId) return false

    const bookingStart = new Date(booking.start)
    const bookingEnd = new Date(booking.end_date)

    return bookingStart < newEnd && bookingEnd > newStart
  })
}

const availableVehicles = computed(() => {
  if (!start.value || !end.value) {
    return []
  }
  return vehicleStore.vehicles.filter(v => !hasConflictForVehicle(v.id))
})
</script>

<template>
  <div>
    <label for="checkStart">Start</label>
    <input id="checkStart" type="datetime-local" v-model="start" />

    <label for="checkEnd">Ende</label>
    <input id="checkEnd" type="datetime-local" v-model="end" />

    <ul>
      <li v-for="v in availableVehicles" :key="v.id">
        {{ v.make_model }} — {{ v.color }} — {{ v.licence_plate }}
      </li>
    </ul>
  </div>
</template>