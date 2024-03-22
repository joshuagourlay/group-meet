import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import EventPage from '../views/EventPage.vue';
import EventCreation from '../views/EventCreation.vue';
import EventSummary from '../views/EventSummary.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      
      {
        path: '/events',
        name: 'Events',
        component: EventSummary,
      },
      {
        path: '/events/:id',
        name: 'Events-id',
        component: EventPage,
      },
      {
        path: '/add-event',
        name: 'EventCreation',
        component: EventCreation,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;