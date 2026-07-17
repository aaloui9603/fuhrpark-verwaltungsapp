<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleSubmit() {
    errorMessage.value = ''

    if (!email.value || !password.value) {
        errorMessage.value = 'Bitte E-Mail und Passwort eingeben.'
        return
    }

    const result = await authStore.loginWithCredentials(email.value, password.value)

    if (!result.success) {
        errorMessage.value = result.message
        return
    }
}
</script>

<template>
<div class="login-page p-8">
    <h1 class="text-xl mb-4">Willkommen zurück!</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 max-w-xs">
        <label for="email">E-Mail</label>
        <input id="email" v-model="email" type="email" autocomplete="username" class="border p-2 rounded" />

        <label for="password">Passwort</label>
        <input id="password" v-model="password" type="password" autocomplete="current-password" class="border p-2 rounded" />

        <p v-if="errorMessage" class="error text-red-600">{{ errorMessage }}</p>

        <button type="submit" class="border p-2 rounded">Einloggen</button>
    </form>
</div>
</template>