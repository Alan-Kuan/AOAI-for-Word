import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

const https_cred_path = `${ os.homedir() }/.office-addin-dev-certs`

function loadIfExists(file_name) {
    const file_path = path.resolve(`${https_cred_path}/${file_name}`);
    if (!fs.existsSync(file_path))
        return '';
    return fs.readFileSync(file_path);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueI18nPlugin(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 3000,
        https: {
            key: loadIfExists('localhost.key'),
            cert: loadIfExists('localhost.crt'),
            ca: loadIfExists('ca.crt')
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                login: path.resolve(__dirname, 'login/index.html'),
                login_dialog: path.resolve(__dirname, 'login_dialog/index.html'),
            },
            output: {
                entryFileNames: (asset_info) => {
                    if (asset_info.name === 'main')
                        return 'main.js';
                    return '[name]/main.js';
                },
            }
        }
    }
})
