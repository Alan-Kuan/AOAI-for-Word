const base_url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
const login_url = `${base_url}/login_dialog/index.html`;
let login_dialog;

function onLoginMessageReceived(arg) {
    login_dialog.close();

    const data = JSON.parse(arg.message);
    if (data.ok) {
        localStorage.setItem('access_token', data.access_token)
        location.href = `/?token=${data.id_token}`;
    } else {
        console.log(data.err_msg);
    }
}

export async function signIn() {
    await Office.context.ui.displayDialogAsync(
            login_url,
            { width: 30, height: 40 },
            res => {
                if (res.status === Office.AsyncResultStatus.Failed) {
                    console.log(`${res.error.code}: ${res.error.message}`);
                } else {
                    login_dialog = res.value;
                    login_dialog.addEventHandler(Office.EventType.DialogMessageReceived, onLoginMessageReceived);
                }
            }
        );
}