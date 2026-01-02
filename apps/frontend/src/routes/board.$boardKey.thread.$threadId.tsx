import {createFileRoute} from '@tanstack/react-router';
import {useEffect, useState, useRef} from 'react';
import {type InferResponseType} from 'hono/client';
import {Breadcrumb} from '@repo/ui';
import {apiClient} from '../lib/api-client.js';
import {PostForm, type PostFormHandle} from '../components/PostForm.js';

type ThreadDetailResponse = InferResponseType<typeof apiClient.api.boards[':boardKey']['threads'][':threadId']['$get'], 200>;
type ThreadInfo = ThreadDetailResponse['thread'];
type PostInfo = ThreadDetailResponse['posts'][number];

export const Route = createFileRoute('/board/$boardKey/thread/$threadId')({
	component: ThreadComponent,
});

/**
 * 投稿本文の>>数字をページ内リンクに変換する
 */
function convertAnchorsToLinks(text: string): React.ReactNode[] {
	const parts: React.ReactNode[] = [];
	const regex = />>(\d+)/g;
	let lastIndex = 0;
	let match: RegExpExecArray | undefined;

	while ((match = regex.exec(text)) !== null) {
		// マッチの前のテキストを追加
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}

		// >>数字の部分をリンクとして追加
		const postNumber = match[1];
		if (!postNumber) {
continue;
}

		parts.push(<a
				key={`${match.index}-${postNumber}`}
				href={`#${postNumber}`}
				style={{
					color: 'var(--color-primary, #1976d2)',
					textDecoration: 'none',
					fontWeight: 500,
				}}
				onClick={e => {
					e.preventDefault();
					const element = document.getElementById(postNumber);
					if (element) {
						element.scrollIntoView({behavior: 'smooth', block: 'start'});
					}
				}}
			>
				{match[0]}
			</a>);

		lastIndex = regex.lastIndex;
	}

	// 残りのテキストを追加
	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	return parts.length > 0 ? parts : [text];
}

function ThreadComponent() {
	const {boardKey, threadId} = Route.useParams();
	const [thread, setThread] = useState<ThreadInfo | undefined>(undefined);
	const [posts, setPosts] = useState<PostInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const postFormRef = useRef<PostFormHandle>(null);

	useEffect(() => {
		void fetchThread();
	}, [boardKey, threadId]);

	useEffect(() => {
		if (thread?.title) {
			document.title = `${thread.title} - ${thread.board.title} - ふみみちゃんねる`;
		}
	}, [thread]);

	async function fetchThread() {
		setIsLoading(true);
		setError(undefined);

		try {
			const response = await apiClient.api.boards[':boardKey'].threads[':threadId'].$get({
				param: {boardKey, threadId},
			});

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('スレッドが見つかりません');
				}

				throw new Error('スレッドの取得に失敗しました');
			}

			const data = await response.json();
			setThread(data.thread);
			setPosts(data.posts);
		} catch (error_) {
			setError(error_ instanceof Error ? error_.message : 'Unknown error');
		} finally {
			setIsLoading(false);
		}
	}

	const handlePostCreated = () => {
		void fetchThread();
	};

	const handleQuoteClick = (postNumber: number) => {
		postFormRef.current?.addQuote(postNumber);
	};

	return (
		<div style={{padding: '2rem'}}>
					{error && <p style={{color: 'red'}}>{error}</p>}

					{isLoading ? (
						<p>読込中...</p>
					) : (thread ? (
						<>
							<Breadcrumb
								items={[
									{label: 'トップ', href: '/'},
									{label: thread.board.title, href: `/board/${boardKey}`},
									{label: thread.title},
								]}
							/>

							{/* スレッド情報 */}
							<div style={{marginBottom: '1.5rem'}}>
								<h2 style={{marginBottom: '0.5rem'}}>{thread.title}</h2>
								<div style={{
display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#666',
}}>
									<span>投稿数: {posts.length}</span>
									<span>
										ステータス:{' '}
										<span
											style={{
												padding: '0.125rem 0.5rem',
												borderRadius: '4px',
												fontSize: '0.75rem',
												backgroundColor: thread.status === 'OPEN' ? '#e8f5e9' : '#fce4ec',
												color: thread.status === 'OPEN' ? '#2e7d32' : '#c2185b',
											}}
										>
											{thread.status}
										</span>
									</span>
									<span>作成: {new Date(thread.createdAt).toLocaleString('ja-JP')}</span>
								</div>
							</div>

							<hr style={{margin: '1.5rem 0', border: 'none', borderTop: '1px solid #eee'}} />

							{/* 投稿一覧 */}
							<div style={{marginBottom: '2rem'}}>
								{posts.length === 0
? (
									<p>投稿がありません</p>
								)
: (
									<div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
										{posts.map(post => (
											<article
												key={post.id}
												id={`${post.number}`}
												style={{
													border: '1px solid #e0e0e0',
													borderRadius: '8px',
													padding: '1rem',
													backgroundColor: 'var(--color-bg-secondary, #fafafa)',
													scrollMarginTop: '1rem',
												}}
											>
												<div
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'baseline',
														marginBottom: '0.5rem',
														fontSize: '0.875rem',
														color: '#666',
													}}
												>
													<div>
														<button
															type='button'
															onClick={() => {
 handleQuoteClick(post.number);
}}
															style={{
																color: 'var(--color-text-primary, #333)',
																textDecoration: 'none',
																fontWeight: 'bold',
																background: 'none',
																border: 'none',
																padding: 0,
																cursor: 'pointer',
															}}
														>
															{post.number}:
														</button>
														{' '}
														<span style={{fontWeight: 500}}>{post.name}</span>
														{' '}
														<span style={{color: '#999'}}>ID:{post.posterId}</span>
													</div>
													<time>{new Date(post.createdAt).toLocaleString('ja-JP')}</time>
												</div>
												<div
													style={{
														whiteSpace: 'pre-wrap',
														wordBreak: 'break-word',
														color: 'var(--color-text-primary, #333)',
													}}
												>
													{convertAnchorsToLinks(post.body)}
												</div>
											</article>
										))}
									</div>
								)}
							</div>

							{/* 返信フォーム */}
							{thread.status === 'OPEN' && !thread.board.isReadOnly
? (
								<PostForm
									ref={postFormRef}
									boardKey={boardKey}
									threadId={threadId}
									onPostCreated={handlePostCreated}
								/>
							)
: (
								<div
									style={{
										padding: '1rem',
										backgroundColor: '#fafafa',
										border: '1px solid #e0e0e0',
										borderRadius: '8px',
										color: '#666',
										textAlign: 'center',
									}}
								>
									{thread.board.isReadOnly
										? 'この板は読み取り専用です'
										: 'このスレッドは閉じられています'}
								</div>
							)}
						</>
					) : null)}
		</div>
	);
}
