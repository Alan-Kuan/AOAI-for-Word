import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const https_cred_path = `${ os.homedir() }/.office-addin-dev-certs`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(`${https_cred_path}/localhost.key`)),
      cert: fs.readFileSync(path.resolve(`${https_cred_path}/localhost.crt`)),
      ca: fs.readFileSync(path.resolve(`${https_cred_path}/ca.crt`))
    }
  }
})
