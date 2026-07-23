<script setup>
import ToastContainer from './components/ToastContainer.vue';
import { useThemeStore } from './stores/themeStore.js';

const themeStore = useThemeStore()
</script>

<template>
  <button @click="themeStore.toggleTheme()" class="fixed top-4 right-4 z-50 px-3 py-1 rounded bg-telematic-accent text-white dark:bg-hud-glow-soft dark:text-cockpit-base">
    {{ themeStore.isDark ? '☀️ Light' : '🌓 Dark' }}
</button>
  <router-view />
  <toast-container />
</template>