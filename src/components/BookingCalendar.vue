<script setup>
import { computed } from 'vue'
import { useBookingStore } from '../stores/bookingStore.js'
import { useVehicleStore } from '../stores/vehicleStore.js'

const bookingStore = useBookingStore()
const vehicleStore = useVehicleStore()

const nextSevenDays = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })
})

function isBookedOn(vehicleId, day) {
return bookingStore.bookings.some((booking) => {
if (booking.vehicle_id !== vehicleId) return false

const bookingStart = new Date(booking.start)
const bookingEnd = new Date(booking.end_date)

return bookingStart <= day && bookingEnd >= day })
}

</script>

<template>
  <div class="vehicle-grid">
    <!-- Eine Zeile pro Fahrzeug (äußere Schleife) -->
    <div
      v-for="v in vehicleStore.vehicles"
      :key="v.id"
      class="vehicle-row"
    >
      <!-- Anzeige des Fahrzeugnamens -->
      <div class="vehicle-name">{{ v.make_model }} — {{ v.color }}</div>

      <!-- Eine Zelle für jeden Tag (innere Schleife) -->
      <div
        v-for="day in nextSevenDays"
        :key="day.toISOString()"
        class="day-cell"
      >
        {{ day.toLocaleDateString('de-DE', { weekday: 'short' }) }}
      </div>

      <div 
        v-for="day in nextSevenDays"
        :key="day.toISOString()"
        class="day-cell"
        :class="{ booked: isBookedOn(v.id, day) }"
      > 
        {{ day.toLocaleDateString('de-DE', { weekday: 'short' }) }}
    </div>
    </div>
  </div>
</template>