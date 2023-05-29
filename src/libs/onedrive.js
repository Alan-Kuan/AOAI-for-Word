import 'isomorphic-fetch';
import mammoth from 'mammoth/mammoth.browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { notify } from '@/libs/notify.js';

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
        .get()
        .catch(err => {
            const err_msg = err.message;
            if (err_msg === 'Access token has expired or is not yet valid.') {
                notify('請重新登入以瀏覽 OneDrive 內容');
            } else {
                console.error(err);
            }
            return null;
        });
    
    if (!res) {
        return {
            error: true,
            has_next: false,
            entries: []
        };
    }

    const entries = res.value
        .filter(isDocx)
        .map(entry => {
            return {
                id: entry.id,
                name: entry.name,
            }
        });

    next_link = res['@odata.nextLink'] ?? null;
    return {
        error: false,
        has_next: next_link !== null,
        entries
    };
}

export async function getContent(id) {
    const res = await client.api(`/me/drive/items/${id}/content`)
        .get();

    let buffers = [];
    let buffer_size = 0;

    const reader = res.getReader();
    await reader.read().then(function process({ done, value }) {
            if (done) return;

            buffers.push(value);
            buffer_size += value.length;

            return reader.read().then(process);
        });

    const docx = new Uint8Array(buffer_size);
    let offset = 0;
    for (const buffer of buffers) {
        docx.set(buffer, offset);
        offset += buffer.length;
    }

    return await mammoth.extractRawText({ arrayBuffer: docx })
        .then(res => {
            return res.value;
        })
        .catch(err => {
            notify('讀取檔案時發生未知錯誤');
            console.error(err);
            return '';
        });
}