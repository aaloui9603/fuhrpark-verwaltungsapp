<script setup>

import { ref } from 'vue'
import { useVehicleStore } from '../stores/vehicleStore'

const vehicleStore = useVehicleStore()
const makeModel = ref('')
const color = ref('')
const licencePlate = ref('')



async function handleSubmit() {
const result = await vehicleStore.addVehicle({
make_model: makeModel.value,
color: color.value,
licence_plate: licencePlate.value
})



if (result.success) {
makeModel.value = ''
color.value = ''
licencePlate.value = ''
}
}

</script>
<template>

<form @submit.prevent="handleSubmit" class="text-telematic-text dark:text-hud-text">
<label for="makeModel">Marke/Modell</label>
<input id="makeModel" v-model="makeModel" type="text" /> 

<label for="color">Farbe</label>
<input id ="color" v-model="color" type="text" />

<label for="licencePlate">Kennzeichen</label>
<input id="licencePlate" v-model="licencePlate" type="text" />
<button type="submit">Fahrzeug anlegen</button>
</form>

</template>