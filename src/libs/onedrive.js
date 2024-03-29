import 'isomorphic-fetch';
import mammoth from 'mammoth/mammoth.browser';
import { Client } from '@microsoft/microsoft-graph-client';

import i18n from '@/i18n.js';
import { notify } from '@/libs/notify.js';

const authProvider = (callback) => {
    const access_token = localStorage.getItem('access_token');
    callback(null, access_token);
};
const client = Client.init({ authProvider });

let curr_entry = 0;

export async function getWordFiles(limit=5, query_filename, reload=false) {
    if (reload) curr_entry = 0;

    const res = await client.api('/search/query')
        .post({
            requests: [
                {
                    entityTypes: [ 'driveItem' ],
                    query: {
                        queryString: `${query_filename} filetype:docx`
                    },
                    fields: [
                        'id',
                        'name',
                        'driveId',
                        'createdBy',
                    ],
                    from: curr_entry,
                    size: limit,
                }
            ]
        })
        .catch(err => {
            const err_msg = err.message;
            if (err_msg === 'Access token has expired or is not yet valid.') {
                notify(i18n.global.t('message.onedrive.relogin'));
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

    // update current entry to next entry
    curr_entry += limit;

    const hits_container = res.value[0].hitsContainers[0];
    const entries = hits_container.hits
        .map(entry => {
            return {
                id: entry.resource.id,
                name: entry.resource.name,
                drive_id: entry.resource.listItem.fields.driveId,
                creator: entry.resource.listItem.fields.createdBy,
            };
        });

    return {
        error: false,
        has_next: hits_container.moreResultsAvailable,
        entries
    };
}

export async function getContent(drive_id, id) {
    const res = await client.api(`/me/drives/${drive_id}/items/${id}/content`)
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
            notify(i18n.global.t('message.onedrive.load_failed'));
            console.error(err);
            return '';
        });
}