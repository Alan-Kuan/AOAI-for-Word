import { createApp } from 'vue';
import App from '@/App.vue';

import router from '@/router';

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

// workaround for vue router bug https://github.com/OfficeDev/office-js/pull/2808
// from: https://github.com/OfficeDev/office-js/pull/2808#issuecomment-1471643059
function boot() {
    const replaceState = window.history.replaceState;
    const pushState = window.history.pushState;

    return new Promise(async resolve => {
            const script = document.createElement('script');
            script.src = 'https://appsforoffice.microsoft.com/lib/1/hosted/office.js';
            script.onload = () => {
                    Office.onReady(() => {
                        window.history.replaceState = replaceState;
                        window.history.pushState = pushState;
                        resolve();
                    });
                };
            document.body.appendChild(script);
        });
}

boot().then(() => {
    Office.onReady(() => {
        createApp(App)
            .use(router)
            .use(vuetify)
            .mount('#app');
    });
});