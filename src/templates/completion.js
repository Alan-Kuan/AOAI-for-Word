export const templates = [
    {
        name: '換句話說',
        default_prompt_prefix: '請用白話文改寫\n',
        default_prompt_suffix: '',
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
        name: '會議摘要',
        default_prompt_prefix: '這是一篇即時語音的會議記錄。\n',
        default_prompt_suffix: '\n我將會議記錄中的待辦事項條列出來，並做了一段摘要。\n',
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