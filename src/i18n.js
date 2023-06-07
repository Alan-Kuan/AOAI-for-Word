import { createI18n } from 'vue-i18n';

export default createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
        zh: {
            message: {
                settings: {
                    save_succ: '儲存成功',
                    remove_succ: '移除成功',
                },
                onedrive: {
                    relogin: '請重新登入以瀏覽 OneDrive 內容',
                    load_failed: '讀取檔案時發生未知錯誤',
                },
                openai: {
                    unknown_api_endpoint: '未知的 API 端點',
                    token_limit_exceeded: '超過此模型單次請求的 token 數量上限 {limit}',
                    request_limit_exceeded: '達到此模型每分鐘內的使用量上限',
                },
            },
        },
        en: {
            message: {
                settings: {
                    save_succ: 'Successfully Saved',
                    remove_succ: 'Successfully Removed',
                },
                onedrive: {
                    relogin: 'Please re-login to browse contents from OneDrive',
                    load_failed: 'An unknown error occurred while loading the file',
                },
                openai: {
                    unknown_api_endpoint: 'Unknown API Endpoint',
                    token_limit_exceeded: 'Token limit exceeded ({limit} tokens)',
                    request_limit_exceeded: 'Request limit per minute exceeded',
                },
            },
        }
    }
});