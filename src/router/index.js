// Alle Imports einbinden 
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

// Routen einbinden
const routes = [
    { path: '/', name: 'login', component: LoginView },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router