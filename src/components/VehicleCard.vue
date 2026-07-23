<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useVehicleStore } from '../stores/vehicleStore'
import StatusAmpel from './StatusAmpel.vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const authStore = useAuthStore()
const vehicleStore = useVehicleStore()
const inspectionDate = ref(props.vehicle.inspection_date)

async function saveInspectionDate() {
  await vehicleStore.updateVehicle(props.vehicle.id, { inspection_date: inspectionDate.value})
}

const daysUntilInspection = computed(() => {
  if (!props.vehicle.inspection_date) {
    return null
  }
  const today = new Date()
  const inspection = new Date(props.vehicle.inspection_date)
  const diffMs = inspection - today
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
})
</script>

<template>
  <div class="vehicle-card w-full min-w-0 bg-glacier-glass dark:bg-cockpit-glass text-telematic-text dark:text-hud-text p-4 rounded border border-telematic-accent/30 dark:border-hud-glow/30">
    <p>{{ vehicle.make_model }} — {{ vehicle.color }}</p>
    <p>{{ vehicle.licence_plate }}</p>

    <div
      v-if="authStore.role === 'admin' || authStore.role === 'coordinator'"
      class="flex flex-wrap gap-2 items-center"
    >
      <label>TÜV-Termin</label>
      <input type="date" v-model="inspectionDate" />
      <button @click="saveInspectionDate">Speichern</button>
      <button @click="$emit('edit', vehicle)">Bearbeiten</button>
      <button @click="$emit('delete', vehicle.id)">Löschen</button>
      <StatusAmpel :days="daysUntilInspection" />
    </div>
  </div>
</template>