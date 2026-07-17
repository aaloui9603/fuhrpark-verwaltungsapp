import './styles/main.css'
import './styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
app.use(createPinia())

const authStore = useAuthStore()
await authStore.initAuth()

app.use(router)
app.mount('#app')