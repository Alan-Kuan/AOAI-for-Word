import axios from 'axios';
import { max_tokens } from '@/libs/parameter.js';
import { notify } from '@/libs/notify.js';

const endpoint = import.meta.env.VITE_AZ_OPENAI_ENDPOINT;
const deployment = import.meta.env.VITE_AZ_OPENAI_DEPLOYMENT;
const api_key = import.meta.env.VITE_AZ_OPENAI_KEY;
const api_version = import.meta.env.VITE_AZ_OPENAI_VERSION;

const req = axios.create({
    baseURL: `${endpoint}/openai/deployments/${deployment}`,
    headers: {
        'Content-Type': 'application/json',
        'api-key': api_key,
    },
    params: {
        'api-version': api_version,
    },
});

export async function complete(prompt, temperature, top_p) {
    return await req.post('/completions', {
            prompt,
            max_tokens: parseInt(max_tokens.value, 10),
            temperature: temperature,
            top_p: top_p,
        })
        .then(res => {
            return res.data.choices[0].text.replace(/^[\r\n]+/, '');
        })
        .catch(err => {
            notify(err.message);
            return null;
        });
}