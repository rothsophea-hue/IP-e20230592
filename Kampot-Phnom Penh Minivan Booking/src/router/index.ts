import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TripDetailView from '../views/TripDetailView.vue';
import MyBookingsView from '../views/MyBookingsView.vue';
import OperatorView from '../views/OperatorView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/trips/:id', name: 'trip-detail', component: TripDetailView },
    { path: '/bookings', name: 'bookings', component: MyBookingsView },
    { path: '/operator', name: 'operator', component: OperatorView },
  ],
});

export default router;