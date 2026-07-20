<script setup>
import { useAuthStore } from '../stores/authStore'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const authStore = useAuthStore()
</script>

<template>
  <div class="vehicle-card">
    <p>{{ vehicle.make_model }} — {{ vehicle.color }}</p>
    <p>{{ vehicle.licence_plate }}</p>

    <div v-if="authStore.role === 'admin'">
      <button @click="$emit('edit', vehicle)">Bearbeiten</button>
      <button @click="$emit('delete', vehicle.id)">Löschen</button>
    </div>
  </div>
</template>