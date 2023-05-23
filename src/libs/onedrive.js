import 'isomorphic-fetch';
import { Client, PageIterator } from '@microsoft/microsoft-graph-client';

const authProvider = (callback) => {
    const access_token = localStorage.getItem('access_token');
    callback(null, access_token);
};
const client = Client.init({ authProvider });

function isDocx(entry) {
    return entry.file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}

let next_link = null;

export async function getWordFiles(limit=5) {
    const path = next_link ?? "/me/drive/root/search(q='.docx')";
    const res = await client.api(path)
        .select('id')
        .select('name')
        .select('file')
        .top(limit)
        .get();
    const entries = res.value
        .filter(isDocx)
        .map(entry => {
            return {
                id: entry.id,
                name: entry.name,
            }
        });

    next_link = res['@odata.nextLink'] ?? null;

    return { has_next: next_link !== null, entries };
}