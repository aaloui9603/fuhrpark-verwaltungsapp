// Alle Imports einbinden
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '../stores/authStore'

// Routen einbinden
const routes = [
    { path: '/', name: 'login', component: LoginView },
    { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.user) {
        return '/'
    }
})

export default router