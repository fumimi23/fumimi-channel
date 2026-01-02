import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tanStackRouterVite from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanStackRouterVite(),
		react(),
	],
	resolve: {
		alias: {
			'@app/backend': fileURLToPath(new URL('../backend/src/index.ts', import.meta.url)), // eslint-disable-line @typescript-eslint/naming-convention
		},
	},
	server: {
		host: true,
		port: 5173,
		proxy: {
			'/api': { // eslint-disable-line @typescript-eslint/naming-convention
				target: 'http://backend:3000',
				changeOrigin: true,
			},
		},
	},
});
