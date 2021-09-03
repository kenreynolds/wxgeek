import { createRouter, createWebHistory } from 'vue-router';
import CurrentWeather from '@/views/CurrentWeather';
import DailyForecast from '@/views/DailyForecast';
import SiteMenu from '@/views/SiteMenu';

const routes = [
  {
    path: '/',
    name: 'CurrentWeather',
    component: CurrentWeather,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/site-menu',
    name: 'SiteMenu',
    component: SiteMenu,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
