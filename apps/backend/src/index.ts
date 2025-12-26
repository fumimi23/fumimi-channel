import {serve} from '@hono/node-server';
import {Hono} from 'hono';
import {logger} from 'hono/logger';
import {cors} from 'hono/cors';
import {healthRouter} from './routes/health.js';
import {apiRouter} from './routes/api.js';

const app = new Hono()

// Middleware
	.use('*', logger())
	.use('*', cors())

// Routes
	.route('/health', healthRouter)
	.route('/api', apiRouter)

// Root endpoint
	.get('/', c => c.json({
		message: 'Fumimi Channel API Server',
		version: '0.1.0',
		endpoints: {
			health: '/health',
			api: '/api',
		},
	}))

// 404 handler
	.notFound(c => c.json({error: 'Not Found', path: c.req.path}, 404))

// Error handler
	.onError((error, c) => {
		console.error('Error:', error);
		return c.json(
			{
				error: 'Internal Server Error',
				message: error.message,
			},
			500,
		);
	});

const port = Number(process.env.PORT) || 3000;

console.log(`Starting server on port ${port}...`);

serve({
	fetch: app.fetch,
	port,
});

export type AppType = typeof app;

console.log(`Server is running on http://localhost:${port}`);
