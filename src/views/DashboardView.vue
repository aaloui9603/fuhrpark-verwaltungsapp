<script setup>
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="authStore.user">{{ authStore.user.email }}</p>
  </div>
</template>