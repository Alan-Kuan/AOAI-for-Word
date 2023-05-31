import { PublicClientApplication } from '@azure/msal-browser';

(async () => {
    await Office.onReady();

    const config = {
        auth: {
            clientId: import.meta.env.VITE_CLIENT_ID,
            authority: import.meta.env.VITE_AUTHORITY,
            redirectUri: import.meta.env.VITE_REDIRECT_URL,
        }
    };
    const login_req = {
        scopes: [ 'Files.Read.All' ]
    };

    const msal = new PublicClientApplication(config);

    msal.handleRedirectPromise()
        .then(res => {
            if (res) {
                const data = {
                    ok: true,
                    id_token: res.idToken,
                    access_token: res.accessToken
                };
                Office.context.ui.messageParent(JSON.stringify(data));
            } else {
                msal.loginRedirect(login_req);
            }
        })
        .catch(err => {
            const data = { ok: false, err_msg: err.message };
            Office.context.ui.messageParent(JSON.stringify(data));
        });
})();
