import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Function form required — this Vite version builds on Rolldown, which
        // throws `TypeError: manualChunks is not a function` given the classic
        // Rollup object form (`{ vendor: [...] }`). Groups the core, rarely-changing
        // deps into one `vendor` chunk separate from app code, so a normal app-code
        // deploy doesn't invalidate the browser cache for this chunk.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router-dom|@tanstack|axios|zustand|sonner|react-hook-form)\//.test(id)) {
            return 'vendor'
          }
        },
      },
    },
  },
})
