import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/Main.vue'),
    },
];

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});