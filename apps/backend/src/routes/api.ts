import {Hono} from 'hono';
import {zValidator} from '@hono/zod-validator';
import {z} from 'zod';
import {toIsoString, getNow} from '@repo/shared';
import {createPrismaClient} from '@repo/database';
import {generatePosterId} from '../libs/index.js';

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
 * - status: スレッドステータス（省略時: OPENとCLOSEDを両方表示、ARCHIVEDは明示的に指定が必要）
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
				status: z.enum(['OPEN', 'CLOSED', 'ARCHIVED']).optional(),
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

			// Statusが指定されていない場合はOPENとCLOSEDを取得（ARCHIVEDは除外）
			const statusFilter = status ?? {in: ['OPEN', 'CLOSED'] as Array<'OPEN' | 'CLOSED'>};

			// スレッド一覧を取得
			const [threads, total] = await Promise.all([
				prisma.thread.findMany({
					where: {
						boardKey,
						status: statusFilter,
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
						posts: {
							select: {
								id: true,
								body: true,
								name: true,
								ipAddress: true,
								createdAt: true,
							},
							orderBy: {
								createdAt: 'asc',
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
						status: statusFilter,
					},
				}),
			]);

			return c.json({
				threads: threads.map(thread => {
					// 最初の投稿（OP）
					const firstPost = thread.posts[0];
					// 最新10件の投稿（最初の投稿を除く）
					const recentPosts = thread.posts.length > 1
						? thread.posts.slice(-10).filter(p => p.id !== firstPost?.id)
						: [];

					return {
						id: thread.id,
						title: thread.title,
						status: thread.status,
						postCount: thread._count.posts,
						createdAt: toIsoString(thread.createdAt),
						updatedAt: toIsoString(thread.updatedAt),
						firstPost: firstPost
							? {
								id: firstPost.id,
								number: 1,
								content: firstPost.body,
								name: firstPost.name ?? '名無しさん',
								posterId: generatePosterId(firstPost.ipAddress, firstPost.createdAt),
								createdAt: toIsoString(firstPost.createdAt),
							}
							: undefined,
						recentPosts: recentPosts.map((post, index) => ({
							id: post.id,
							number: thread.posts.length - recentPosts.length + index + 1,
							content: post.body,
							name: post.name ?? '名無しさん',
							posterId: generatePosterId(post.ipAddress, post.createdAt),
							createdAt: toIsoString(post.createdAt),
						})),
					};
				}),
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			});
		},
	)

/**
 * POST /api/boards/:boardKey/threads
 * 新規スレッドを作成
 */
	.post(
		'/boards/:boardKey/threads',
		zValidator(
			'param',
			z.object({
				boardKey: z.string().max(64),
			}),
		),
		zValidator(
			'json',
			z.object({
				title: z.string().min(1).max(255),
				body: z.string().min(1),
				name: z.string().max(255).optional(),
			}),
		),
		async c => {
			const {boardKey} = c.req.valid('param');
			const {title, body, name} = c.req.valid('json');

			// クライアントのIPアドレスを取得
			const ipAddress = c.req.header('x-forwarded-for')?.split(',')[0]?.trim()
				?? c.req.header('x-real-ip')
				?? 'unknown';

			// 板の存在確認と読み取り専用チェック
			const board = await prisma.board.findUnique({
				where: {key: boardKey},
				select: {key: true, isReadOnly: true},
			});

			if (!board) {
				return c.json({error: 'Board not found'}, 404);
			}

			if (board.isReadOnly) {
				return c.json({error: 'This board is read-only'}, 403);
			}

			// トランザクションでスレッドと最初の投稿を作成
			const thread = await prisma.$transaction(async tx => {
				const newThread = await tx.thread.create({
					data: {
						boardKey,
						title,
						status: 'OPEN',
					},
					select: {
						id: true,
						title: true,
						status: true,
						createdAt: true,
						updatedAt: true,
					},
				});

				// 最初の投稿を作成
				await tx.post.create({
					data: {
						threadId: newThread.id,
						body,
						name: name ?? null,
						ipAddress,
					},
				});

				return newThread;
			});

			return c.json({
				thread: {
					id: thread.id,
					title: thread.title,
					status: thread.status,
					createdAt: toIsoString(thread.createdAt),
					updatedAt: toIsoString(thread.updatedAt),
				},
			}, 201);
		},
	)

/**
 * GET /api/boards/:boardKey/threads/:threadId
 * 特定のスレッドの詳細と投稿一覧を取得
 */
	.get(
		'/boards/:boardKey/threads/:threadId',
		zValidator(
			'param',
			z.object({
				boardKey: z.string().max(64),
				threadId: z.string().uuid(),
			}),
		),
		async c => {
			const {boardKey, threadId} = c.req.valid('param');

			// スレッドと投稿を取得
			const thread = await prisma.thread.findFirst({
				where: {
					id: threadId,
					boardKey,
				},
				select: {
					id: true,
					title: true,
					status: true,
					createdAt: true,
					updatedAt: true,
					board: {
						select: {
							key: true,
							title: true,
							isReadOnly: true,
						},
					},
					posts: {
						select: {
							id: true,
							body: true,
							name: true,
							createdAt: true,
							ipAddress: true,
						},
						orderBy: {
							createdAt: 'asc',
						},
					},
				},
			});

			if (!thread) {
				return c.json({error: 'Thread not found'}, 404);
			}

			return c.json({
				thread: {
					id: thread.id,
					title: thread.title,
					status: thread.status,
					createdAt: toIsoString(thread.createdAt),
					updatedAt: toIsoString(thread.updatedAt),
					board: thread.board,
				},
				posts: thread.posts.map((post, index) => ({
					id: post.id,
					number: index + 1, // 投稿番号
					body: post.body,
					name: post.name ?? '名無しさん',
					posterId: generatePosterId(post.ipAddress, post.createdAt),
					createdAt: toIsoString(post.createdAt),
				})),
			});
		},
	)

/**
 * POST /api/boards/:boardKey/threads/:threadId/posts
 * スレッドに投稿を追加
 */
	.post(
		'/boards/:boardKey/threads/:threadId/posts',
		zValidator(
			'param',
			z.object({
				boardKey: z.string().max(64),
				threadId: z.string().uuid(),
			}),
		),
		zValidator(
			'json',
			z.object({
				body: z.string().min(1),
				name: z.string().max(255).optional(),
			}),
		),
		async c => {
			const {boardKey, threadId} = c.req.valid('param');
			const {body, name} = c.req.valid('json');

			// クライアントのIPアドレスを取得
			const ipAddress = c.req.header('x-forwarded-for')?.split(',')[0]?.trim()
				?? c.req.header('x-real-ip')
				?? 'unknown';

			// スレッドの存在確認（基本的なチェックのみ）
			const thread = await prisma.thread.findFirst({
				where: {
					id: threadId,
					boardKey,
				},
				select: {
					id: true,
					status: true,
					board: {
						select: {
							isReadOnly: true,
						},
					},
				},
			});

			if (!thread) {
				return c.json({error: 'Thread not found'}, 404);
			}

			if (thread.board.isReadOnly) {
				return c.json({error: 'This board is read-only'}, 403);
			}

			if (thread.status !== 'OPEN') {
				return c.json({error: 'Thread is closed'}, 403);
			}

			// トランザクション内で投稿数チェックと投稿作成を実行（レースコンディション対策）
			let post;
			try {
				post = await prisma.$transaction(async tx => {
					// トランザクション内で投稿数をカウント
					const postCount = await tx.post.count({
						where: {
							threadId,
						},
					});

					// 投稿数制限をチェック（1000件まで）
					if (postCount >= 1000) {
						throw new Error('Thread has reached the maximum number of posts (1000)');
					}

					const newPost = await tx.post.create({
						data: {
							threadId,
							body,
							name: name ?? null,
							ipAddress,
						},
						select: {
							id: true,
							body: true,
							name: true,
							createdAt: true,
						},
					});

					// 1000件目の投稿の場合、スレッドをCLOSEDにする
					const updateData: {updatedAt: Date; status?: 'CLOSED'} = {
						updatedAt: getNow().toDate(),
					};

					if (postCount + 1 >= 1000) {
						updateData.status = 'CLOSED';
					}

					// スレッドのupdatedAtを更新（bump）、必要ならstatusも更新
					await tx.thread.update({
						where: {id: threadId},
						data: updateData,
					});

					return newPost;
				});
			} catch (error) {
				if (error instanceof Error && error.message === 'Thread has reached the maximum number of posts (1000)') {
					post = null;
				} else {
					throw error;
				}
			}

			if (!post) {
				return c.json({error: 'Thread has reached the maximum number of posts (1000)'}, 403);
			}

			return c.json({
				post: {
					id: post.id,
					body: post.body,
					name: post.name ?? '名無しさん',
					createdAt: toIsoString(post.createdAt),
				},
			}, 201);
		},
	);
