<script setup>

import { ref, computed } from 'vue'
import { useTripStore } from '../stores/tripStore.js'


const props = defineProps(['bookingId'])
const tripStore = useTripStore()
const kmStart = ref(null)
const kmEnd = ref(null)
const date = ref('')
const feedback = ref('')


const distance = computed(() => { 
return kmEnd.value - kmStart.value
})

async function handleSubmit() {
if (kmEnd.value < kmStart.value) {
feedback.value = 'km Ende darf nicht kleiner  als km Start sein.'
return
}

const result = await tripStore.createTrip(props.bookingId, kmStart.value, kmEnd.value, date.value)
feedback.value = result.message
}

</script>

<template>
<form @submit.prevent="handleSubmit">
<input v-model="kmStart" type="number" placeholder="km Start" />
<input v-model="kmEnd" type="number" placeholder="km Ende" />
<input v-model="date" type="date" />
<button type="submit">Trip erfassen</button>
<p v-if="feedback"> {{ feedback }}</p>
<p>Gefahrene Strecke: {{ distance }} km</p>
</form>

</template>