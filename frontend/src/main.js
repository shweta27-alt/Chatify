import { createApp } from 'vue';
import App from './App.vue';
import { create } from './router';
import store from './store'


const router = create();

createApp(App).use(store).use(router).mount('#app')
