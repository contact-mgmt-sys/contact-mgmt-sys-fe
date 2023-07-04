import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import * as VueRouter from 'vue-router';

import Index from './components/Index.vue';
import Create from './components/Create.vue';
import Read from './components/Read.vue';
import Update from './components/Update.vue';

const routes = [
    {path: "/", component: Index, name: "index"},
    {path: "/create", component: Create, name: "create"},
    {path: "/:id", component: Read, name: "read"},
    {path: "/:id/update", component: Update, name: "update"},
    {path: "/:id", component: Read, name: "delete"},
];

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

const pinia = createPinia();
const app = createApp(App)

app.use(router);
app.use(pinia);
app.mount('#app');
