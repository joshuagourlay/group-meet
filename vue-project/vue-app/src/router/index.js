import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import EventDetails from '../views/EventPage.vue';
import EventCreation from '../views/EventCreation.vue';
import EventSummary from '../views/EventSummary.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {

    path: '/',
    component: MainLayout,
    children: [
      
      {
        path: 'dashboard',
        name: 'dashboard',
        component: EventSummary,
      },
      {
        path: '/events/:id',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: '/create-event',
        name: 'create-event',
        component: EventCreation,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;