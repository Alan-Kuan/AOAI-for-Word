import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n.js';
import vuetify from './vuetify.js';

Office.onReady(() => {
        createApp(App)
            .use(i18n)
            .use(vuetify)
            .mount('#app');
    });