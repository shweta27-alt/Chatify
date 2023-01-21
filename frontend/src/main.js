import { createApp } from 'vue';
import App from './App.vue';
import { create } from './router';
import store from './store'
import Toaster from "@meforma/vue-toaster";


const router = create();

createApp(App).use(store).use(router).use(Toaster).mount('#app')
