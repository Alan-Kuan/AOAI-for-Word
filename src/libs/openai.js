import axios from 'axios';
import {
    max_tokens,
    api_key,
    api_endpoint,
    api_deployment,
    api_version,
} from '@/libs/settings.js';
import { notify } from '@/libs/notify.js';
import { curr_completion_tokens, curr_prompt_tokens, total_tokens } from '@/libs/token_usage';

export async function complete(prompt, temperature, top_p) {
    const endpoint = api_endpoint.value.replace(/\/+$/, '');

    const req = axios.create({
        baseURL: `${endpoint}/openai/deployments/${api_deployment.value}`,
        headers: {
            'Content-Type': 'application/json',
            'api-key': api_key.value,
        },
        params: {
            'api-version': api_version.value,
        },
    });

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
            if (err.response.status == 404) {
                notify(`版本日期為 ${api_version.value} 的模型「${api_deployment.value}」不存在`);
            } else {
                notify(err.message);
            }
            return null;
        });
}