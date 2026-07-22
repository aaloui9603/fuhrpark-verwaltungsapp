<script setup>
import { onMounted } from 'vue'
import { useTripStore } from '../stores/tripStore.js'

const props = defineProps(['vehicleId'])
const tripStore = useTripStore()

onMounted(() => {
tripStore.fetchTripsForVehicle(props.vehicleId)
})
</script>

<template>
<ul>
<li v-for="trip in tripStore.trips" :key="trip.id">
{{ trip.date }} - {{ trip.km_start }} km bis {{ trip.km_end }} km
({{ trip.km_end - trip.km_start }} km gefahren)
</li>
</ul>
</template>