import 'isomorphic-fetch';
import {
    max_tokens,
    api_key,
    api_endpoint_completion,
    api_endpoint_dalle,
} from '@/libs/settings.js';
import {
    curr_completion_tokens,
    curr_prompt_tokens,
    total_tokens
} from '@/libs/token_usage';
import { notify } from '@/libs/notify.js';

async function post(endpoint, data) {
    return await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': api_key.value,
            },
            body: JSON.stringify(data),
        });
}

export async function complete(prompt, temperature, top_p) {
    return await post(api_endpoint_completion.value, {
            prompt,
            max_tokens: parseInt(max_tokens.value, 10),
            temperature: temperature,
            top_p: top_p,
        })
        .then(res => res.json())
        .then(data => {
            if ('error' in data) throw data;

            const generated_text = data.choices[0].text.replace(/^[\r\n]+/, '');
            const usage = data.usage;

            curr_completion_tokens.value = usage.completion_tokens;
            curr_prompt_tokens.value = usage.prompt_tokens;
            total_tokens.value += usage.total_tokens;

            return generated_text;
        })
        .catch(data => {
            const err_msg = data.error.message;

            if (data.error.code === '404') {
                notify(`未知的 API 端點`, 5000);
            } else if (err_msg.startsWith("This model's maximum context length is")) {
                const limit = err_msg.match(/\d+/)[0];
                notify(`超過此模型單次請求的 token 數量上限 ${limit}`, 5000)
            } else if (err_msg.includes('have exceeded call rate limit')) {
                notify('達到此模型每分鐘內的使用量上限');
            } else {
                notify(err_msg, -1);
                console.error(data);
            }

            return null;
        });
}

export async function imagen(caption='a big brown cat eating a fish') {
    console.log('imagen')
    return await post(api_endpoint_dalle.value, {
            caption,
            resolution: '1024x1024',
        })
        .then(res => console.log(res))
        .catch(err => console.error(err))
}