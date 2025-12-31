import {Hono} from 'hono';
import {toIsoString} from '@repo/shared';
import {createPrismaClient} from '@repo/database';

// Prisma Client インスタンス
const prisma = createPrismaClient();

export const apiRouter = new Hono()

/**
 * GET /api/boards
 * 板一覧をカテゴリごとに取得
 */
	.get('/boards', async c => {
		const categories = await prisma.boardCategory.findMany({
			select: {
				id: true,
				name: true,
				description: true,
				sortOrder: true,
				createdAt: true,
				updatedAt: true,
				boards: {
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
				},
			},
			orderBy: {
				sortOrder: 'asc',
			},
		});

		return c.json({
			categories: categories.map(category => ({
				id: category.id,
				name: category.name,
				description: category.description,
				sortOrder: category.sortOrder,
				createdAt: toIsoString(category.createdAt),
				updatedAt: toIsoString(category.updatedAt),
				boards: category.boards.map(board => ({
					key: board.key,
					title: board.title,
					description: board.description,
					isReadOnly: board.isReadOnly,
					createdAt: toIsoString(board.createdAt),
					updatedAt: toIsoString(board.updatedAt),
				})),
			})),
		});
	});

