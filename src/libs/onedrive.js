import 'isomorphic-fetch';
import { Client } from '@microsoft/microsoft-graph-client';

const authProvider = (callback) => {
    const access_token = localStorage.getItem('access_token');
    callback(null, access_token);
};
const client = Client.init({ authProvider });

function isDocx(entry) {
    return entry.file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}

export async function getWordFiles(limit=5) {
    const res = await client.api("/me/drive/root/search(q='.docx')")
        .select('id')
        .select('name')
        .select('file')
        .top(limit)
        .get();

    console.log(res)
    // const next_link = res.@odata.nextLink;

    return res.value
        .filter(isDocx)
        .map(entry => {
            return {
                id: entry.id,
                name: entry.name,
            }
        });
}