import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import EventPage from '../views/EventPage.vue'
import EventCreation from '../views/EventCreation.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: RegistrationPage
    },
    {
        path: '/events/:id',
        name:'Events',
        component: EventPage
    },
    {
        path: '/add-event',
        name: 'EventCreation',
        component: EventCreation
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;