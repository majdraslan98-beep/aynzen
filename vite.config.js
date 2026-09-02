import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5176,
    host: true,
    allowedHosts: true,
    watch: {
      // Large media files land in public/ mid-session and Vite's fs watcher
      // can crash with EBUSY on Windows if it tries to watch one while the
      // OS still has a brief lock on it right after it's copied in. These
      // are static assets, not source files, so they never need HMR
      // watching — ignore the whole public/ tree rather than naming each
      // subfolder (a per-folder allowlist kept missing new ones, like
      // public/Pictures, and crashing the dev server when they showed up).
      ignored: ['**/public/**'],
    },
  },
})
