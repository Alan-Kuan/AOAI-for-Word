import axios from 'axios';

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

export async function complete(args) {
    return await req.post('/completions', args)
        .then(res => {
            // use substring() to remove '\n\r\n' at the beginning
            return res.data.choices[0].text.substring(3);
        });
}