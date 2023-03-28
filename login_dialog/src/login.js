import { PublicClientApplication } from '@azure/msal-browser';

(async () => {
    await Office.onReady();

    const config = {
        auth: {
            clientId: import.meta.env.VITE_CLIENT_ID,
            authority: import.meta.env.VITE_AUTHORITY,
            redirectUri: import.meta.env.VITE_REDIRECT_URL,
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: false,
        },
    };

    const msal = new PublicClientApplication(config);

    msal.handleRedirectPromise()
        .then(res => {
            if (res) {
                const data = { ok: true, token: res.idToken };
                Office.context.ui.messageParent(JSON.stringify(data));
            } else {
                msal.loginRedirect();
            }
        })
        .catch(err => {
            const data = { ok: false, err_msg: err.message };
            Office.context.ui.messageParent(JSON.stringify(data));
        });
})();
