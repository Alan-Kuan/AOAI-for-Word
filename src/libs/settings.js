import { ref } from 'vue';
import { notify } from '@/libs/notify.js';

export const generate_location = ref(0);

export const generate_mode = ref(0);
export const max_tokens = ref('1000');

export const api_key = ref('');
export const api_endpoint_completion = ref('');

export function loadCredentials() {
    api_key.value = localStorage.getItem('api_key') ?? '';
    api_endpoint_completion.value = localStorage.getItem('api_endpoint_completion') ?? '';

    // NOTE: migrate old config into new one
    //       plan to be removed in next major update
    const api_endpoint = localStorage.getItem('api_endpoint');
    if (api_endpoint) {
        const api_deployment = localStorage.getItem('api_deployment');
        const api_version = localStorage.getItem('api_version');
        const endpoint = api_endpoint.replace(/\/+$/, '');
        const base_url = `${endpoint}/openai/deployments/${api_deployment}/completions?api-version=${api_version}`;
        api_endpoint_completion.value = base_url;
        localStorage.setItem('api_endpoint_completion', base_url);

        localStorage.removeItem('api_endpoint');
        localStorage.removeItem('api_deployment');
        localStorage.removeItem('api_version');
    }
}

export function saveCredentials() {
    localStorage.setItem('api_key', api_key.value);
    localStorage.setItem('api_endpoint_completion', api_endpoint_completion.value);
    notify('儲存成功');
}

export function cleanCredentials() {
    localStorage.removeItem('api_key');
    localStorage.removeItem('api_endpoint_completion');
    api_key.value = '';
    api_endpoint_completion.value = '';
    notify('移除成功');
}