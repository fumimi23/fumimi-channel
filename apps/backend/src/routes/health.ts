import {Hono} from 'hono';
import {getNow, toIsoString} from '@repo/shared';

export const healthRouter = new Hono()

	.get('/', c => c.json({
		status: 'ok',
		timestamp: toIsoString(getNow()),
	}))

	.get('/ready', c =>
	// データベース接続などのチェックをここに追加
		c.json({
			status: 'ready',
			timestamp: toIsoString(getNow()),
		}))

	.get('/live', c => c.json({
		status: 'alive',
		timestamp: toIsoString(getNow()),
	}));
