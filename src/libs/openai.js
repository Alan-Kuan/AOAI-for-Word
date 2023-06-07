import 'isomorphic-fetch';
import {
    max_tokens,
    api_key,
    api_endpoint_completion,
} from '@/libs/settings.js';
import i18n from '@/i18n.js';
import { notify } from '@/libs/notify.js';
import { curr_completion_tokens, curr_prompt_tokens, total_tokens } from '@/libs/token_usage';

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
                notify(i18n.global.t('message.openai.unknown_api_endpoint'), 5000);
            } else if (err_msg.startsWith("This model's maximum context length is")) {
                const limit = err_msg.match(/\d+/)[0];
                notify(i18n.global.t('message.openai.token_limit_exceeded', { limit }), 5000)
            } else if (err_msg.includes('have exceeded call rate limit')) {
                notify(i18n.global.t('message.openai.request_limit_exceeded'));
            } else {
                notify(err_msg, -1);
                console.error(data);
            }

            return null;
        });
}