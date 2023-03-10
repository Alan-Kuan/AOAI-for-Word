import axios from 'axios';
import { max_tokens } from '@/libs/parameter.js';
import { notify } from '@/libs/notify.js';
import { curr_completion_tokens, curr_prompt_tokens, total_tokens } from '@/libs/token_usage';

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
            const generated_text = res.data.choices[0].text.replace(/^[\r\n]+/, '');
            const usage = res.data.usage;

            curr_completion_tokens.value = usage.completion_tokens;
            curr_prompt_tokens.value = usage.prompt_tokens;
            total_tokens.value += usage.total_tokens;

            return generated_text;
        })
        .catch(err => {
            notify(err.message);
            return null;
        });
}