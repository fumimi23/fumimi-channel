import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Pages()],
  server: {
    port: 2333,
    proxy: {
      '/api': {
        target: 'http://localhost:23323',
        changeOrigin: true,
      },
    },
  },
})
