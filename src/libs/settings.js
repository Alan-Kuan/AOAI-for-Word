import { ref } from 'vue';
import { notify } from '@/libs/notify.js';

export const generate_location = ref(0);

export const generate_mode = ref(0);
export const max_tokens = ref('100');

export const api_key = ref('');
export const api_endpoint = ref('');
export const api_deployment = ref('');
export const api_version = ref('');

export function loadCredentials() {
    const filter = (x) => x === null ? '' : x;
    api_key.value = filter(localStorage.getItem('api_key'));
    api_endpoint.value = filter(localStorage.getItem('api_endpoint'));
    api_deployment.value = filter(localStorage.getItem('api_deployment'));
    api_version.value = filter(localStorage.getItem('api_version'));
}

export function saveCredentials() {
    localStorage.setItem('api_key', api_key.value);
    localStorage.setItem('api_endpoint', api_endpoint.value);
    localStorage.setItem('api_deployment', api_deployment.value);
    localStorage.setItem('api_version', api_version.value);
    notify('儲存成功');
}

export function cleanCredentials() {
    localStorage.removeItem('api_key');
    localStorage.removeItem('api_endpoint');
    localStorage.removeItem('api_deployment');
    localStorage.removeItem('api_version');
    api_key.value = '';
    api_endpoint.value = '';
    api_deployment.value = '';
    api_version.value = '';
    notify('移除成功');
}