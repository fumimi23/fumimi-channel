import {Hono} from 'hono';
import {toIsoString} from '@repo/shared';
import {createPrismaClient} from '@repo/database';

// Prisma Client インスタンス
const prisma = createPrismaClient();

export const apiRouter = new Hono()

/**
 * GET /api/boards
 * 板一覧を取得
 */
	.get('/boards', async c => {
		const boards = await prisma.board.findMany({
			select: {
				key: true,
				title: true,
				description: true,
				isReadOnly: true,
				createdAt: true,
				updatedAt: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		return c.json({
			boards: boards.map((board: typeof boards[number]) => ({
				key: board.key,
				title: board.title,
				description: board.description,
				isReadOnly: board.isReadOnly,
				createdAt: toIsoString(board.createdAt),
				updatedAt: toIsoString(board.updatedAt),
			})),
		});
	});

