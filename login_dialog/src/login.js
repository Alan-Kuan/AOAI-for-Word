import { PublicClientApplication } from '@azure/msal-browser';
import { env_config } from '/login_dialog/src/config.js';

(async () => {
    await Office.onReady();

    let client_id;
    let authority;
    let redirect_uri;

    if (process.env.NODE_ENV === 'production') {
        client_id = env_config.client_id;
        authority = env_config.authority;
        redirect_uri = env_config.redirect_uri;
    } else {
        client_id = import.meta.env.VITE_CLIENT_ID;
        authority = import.meta.env.VITE_AUTHORITY;
        redirect_uri = import.meta.env.VITE_REDIRECT_URI;
    }

    const config = {
        auth: {
            clientId: client_id,
            authority: authority,
            redirectUri: redirect_uri,
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
