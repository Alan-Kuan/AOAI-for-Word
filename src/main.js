import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './vuetify.js';

Office.onReady(() => {
        createApp(App)
            .use(vuetify)
            .mount('#app');
    });