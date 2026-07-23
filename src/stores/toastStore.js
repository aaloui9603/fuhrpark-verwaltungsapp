import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([])

    function showToast(message, type = 'info') {
        const id = Date.now()
        toasts.value.push({ id, message, type })

        setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== id)
        }, 4000)
    }

    return { toasts, showToast}
})