import {createRouter, createWebHistory} from 'vue-router'
import ExchangeRate from "../views/pages/PageExchangeRate.vue";
import Login from "../views/pages/PageLogin.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            props: true,
        },
        {
            path: '/exchangeRate',
            name: 'ExchangeRate',
            component: ExchangeRate,
            props: true,
        },
    ]
})

export default router
