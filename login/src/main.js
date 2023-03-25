import { createApp } from 'vue';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';
import '@/assets/main.css';

const vuetify = createVuetify({
    components,
    directives,
});

Office.onReady(() => {
    createApp(App)
        .use(vuetify)
        .mount('#app');
});