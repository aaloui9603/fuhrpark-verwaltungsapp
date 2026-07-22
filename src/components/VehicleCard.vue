<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useVehicleStore } from '../stores/vehicleStore'

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
</script>

<template>
  <div class="vehicle-card">
    <p>{{ vehicle.make_model }} — {{ vehicle.color }}</p>
    <p>{{ vehicle.licence_plate }}</p>

    <div v-if="authStore.role === 'admin' || authStore.role === 'coordinator'">
      <label>TÜV-Termin</label>
      <input type="date" v-model="inspectionDate" />
      <button @click="saveInspectionDate">Speichern</button>
      <button @click="$emit('edit', vehicle)">Bearbeiten</button>
      <button @click="$emit('delete', vehicle.id)">Löschen</button>
    </div>
  </div>
</template>