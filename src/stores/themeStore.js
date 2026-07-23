import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore ('theme', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark')

    function applyTheme() {
        document.documentElement.classList.toggle('dark', isDark.value)
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    function toggleTheme() {
        isDark.value = !isDark.value
        applyTheme()
    }

    applyTheme()

    return { isDark, toggleTheme }
})