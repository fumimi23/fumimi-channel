import {Hono} from 'hono';
import {zValidator} from '@hono/zod-validator';
import {z} from 'zod';
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
	})

/**
 * GET /api/boards/:boardKey
 * 特定の板の情報を取得
 */
	.get(
		'/boards/:boardKey',
		zValidator(
			'param',
			z.object({
				boardKey: z.string().max(64),
			}),
		),
		async c => {
			const {boardKey} = c.req.valid('param');

			const board = await prisma.board.findUnique({
				where: {
					key: boardKey,
				},
				select: {
					key: true,
					title: true,
					description: true,
					isReadOnly: true,
					createdAt: true,
					updatedAt: true,
					category: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			if (!board) {
				return c.json({error: 'Board not found'}, 404);
			}

			return c.json({
				board: {
					key: board.key,
					title: board.title,
					description: board.description,
					isReadOnly: board.isReadOnly,
					createdAt: toIsoString(board.createdAt),
					updatedAt: toIsoString(board.updatedAt),
					category: board.category,
				},
			});
		},
	)

/**
 * GET /api/boards/:boardKey/threads
 * 特定の板のスレッド一覧を取得
 * クエリパラメータ:
 * - page: ページ番号（デフォルト: 1）
 * - limit: 取得件数（デフォルト: 50）
 * - status: スレッドステータス（デフォルト: OPEN）
 */
	.get(
		'/boards/:boardKey/threads',
		zValidator(
			'param',
			z.object({
				boardKey: z.string().max(64),
			}),
		),
		zValidator(
			'query',
			z.object({
				page: z.string().optional().default('1').transform(Number).pipe(z.number().int().positive()),
				limit: z.string().optional().default('50').transform(Number).pipe(z.number().int().positive().max(100)),
				status: z.enum(['OPEN', 'CLOSED', 'ARCHIVED']).optional().default('OPEN'),
			}),
		),
		async c => {
			const {boardKey} = c.req.valid('param');
			const {page, limit, status} = c.req.valid('query');

			// 板の存在確認
			const board = await prisma.board.findUnique({
				where: {key: boardKey},
				select: {key: true},
			});

			if (!board) {
				return c.json({error: 'Board not found'}, 404);
			}

			// スレッド一覧を取得
			const [threads, total] = await Promise.all([
				prisma.thread.findMany({
					where: {
						boardKey,
						status,
					},
					select: {
						id: true,
						title: true,
						status: true,
						createdAt: true,
						updatedAt: true,
						_count: {
							select: {
								posts: true,
							},
						},
					},
					orderBy: {
						updatedAt: 'desc', // Bump順 (最新更新順)
					},
					take: limit,
					skip: (page - 1) * limit,
				}),
				prisma.thread.count({
					where: {
						boardKey,
						status,
					},
				}),
			]);

			return c.json({
				threads: threads.map(thread => ({
					id: thread.id,
					title: thread.title,
					status: thread.status,
					postCount: thread._count.posts,
					createdAt: toIsoString(thread.createdAt),
					updatedAt: toIsoString(thread.updatedAt),
				})),
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			});
		},
	);
