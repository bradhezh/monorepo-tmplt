import {defineConfig} from 'vitest/config'
// for react transpilation and optimisation
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
      '@frontend': path.resolve(__dirname, '../frontend/src'),
    },
  },
  server: {
    // for the development server to forward restful requests to the backend
    proxy: {
      '/api': {target: 'http://localhost:3001', changeOrigin: true},
    },
  },
  test: {
    environment: 'jsdom', setupFiles: 'src/setupTests.ts',
    // making test funcs such as test, describe, and expect global for js
    globals: true,
  },
})
