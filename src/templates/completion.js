export const templates = [
    {
        zh: {
            name: '換句話說',
            default_prompt_prefix: '請用白話文改寫\n',
            default_prompt_suffix: '',
        },
        en: {
            name: 'Translation',
            default_prompt_prefix: 'Please rewrite the following texts in easier words\n',
            default_prompt_suffix: '',
        },
        params: [
            {
                temperature: 0.5,
                top_p: 1.0
            },
            {
                temperature: 1.0,
                top_p: 1.0
            },
        ],
    },
    {
        zh: {
            name: '會議摘要',
            default_prompt_prefix: '這是一篇即時語音的會議記錄。\n',
            default_prompt_suffix: '\n我將會議記錄中的待辦事項條列出來，並做了一段摘要。\n',
        },
        en: {
            name: 'Summarization',
            default_prompt_prefix: 'This is a real-time transcript of a meeting.\n',
            default_prompt_suffix: '\nI extract a To-do list from the meeting log and summarized it into a short paragraph.\n',
        },
        params: [
            {
                temperature: 0.5,
                top_p: 1.0
            },
            {
                temperature: 1.0,
                top_p: 1.0
            },
        ],
    },
];