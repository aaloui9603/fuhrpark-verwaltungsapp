<script setup>
import { useToastStore } from '../stores/toastStore';

const toastStore = useToastStore()

</script>

<template>
    <div class="toast-container">
        <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast"
        :class="`toast-${toast.type}`"
        >
        {{ toast.message }}
        </div>
        </div>
</template>

<style scoped>
.toast-container {
    position: fixed;
    bottom: 1.5rem; 
    right: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1000;
}

.toast {
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    color: white; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.toast-info { background: #191970; }
.toast-warning { background: #FFD700; color: #191970; }
.toast-danger { background: #DC143C; }
</style>