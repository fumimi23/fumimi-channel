import {createFileRoute, Link} from '@tanstack/react-router';
import {useEffect, useState} from 'react';
import {type InferResponseType} from 'hono/client';
import {Button} from '@repo/ui';
import styles from '../App.module.css';
import {apiClient} from '../lib/api-client.js';
import {ThreadCreateModal} from '../components/ThreadCreateModal.js';

type BoardInfo = InferResponseType<typeof apiClient.api.boards[':boardKey']['$get'], 200>['board'];
type ThreadsResponse = InferResponseType<typeof apiClient.api.boards[':boardKey']['threads']['$get'], 200>;
type ThreadInfo = ThreadsResponse['threads'][number];

export const Route = createFileRoute('/board/$boardKey/')({
	component: BoardComponent,
});

function BoardComponent() {
	const {boardKey} = Route.useParams();
	const [board, setBoard] = useState<BoardInfo | undefined>(undefined);
	const [threads, setThreads] = useState<ThreadInfo[]>([]);
	const [pagination, setPagination] = useState<ThreadsResponse['pagination'] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [currentPage, setCurrentPage] = useState(1);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	useEffect(() => {
		async function fetchBoard() {
			try {
				const response = await apiClient.api.boards[':boardKey'].$get({
					param: {boardKey},
				})

				if (!response.ok) {
					if (response.status === 404) {
						throw new Error('板が見つかりません');
					}

					throw new Error('板情報の取得に失敗しました');
				}

				const data = await response.json();
				setBoard(data.board);
			} catch (error_) {
				setError(error_ instanceof Error ? error_.message : 'Unknown error');
			}
		}

		void fetchBoard();
	}, [boardKey]);

	useEffect(() => {
		void fetchThreads();
	}, [boardKey, currentPage]);

	useEffect(() => {
		if (board?.title) {
			document.title = `${board.title} - ふみみちゃんねる`;
		}
	}, [board]);

	const handleThreadCreated = () => {
		// スレッド作成後、1ページ目に戻してリロード
		setCurrentPage(1);
		void fetchThreads();
	}

	async function fetchThreads() {
		setIsLoading(true);
		try {
			const response = await apiClient.api.boards[':boardKey']['threads'].$get({
				param: {boardKey},
				query: {
					page: currentPage.toString(),
					limit: '50',
					status: 'OPEN',
				},
			})

			if (!response.ok) {
				throw new Error('スレッド一覧の取得に失敗しました');
			}

			const data = await response.json();
			setThreads(data.threads);
			setPagination(data.pagination);
		} catch (error_) {
			setError(error_ instanceof Error ? error_.message : 'Unknown error');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<main className={styles.main}>
				<div style={{padding: '2rem'}}>
					{error && <p style={{color: 'red'}}>{error}</p>}
					{board && (
						<>
							<h2>{board.title}</h2>
							{board.description && <p>{board.description}</p>}
							
							<div style={{marginTop: '1rem'}}>
								<Button
									onClick={() => {
										setIsCreateModalOpen(true)
									}}
									disabled={board.isReadOnly}
								>
									新規スレッド作成
								</Button>
								{board.isReadOnly && (
									<p style={{color: '#666', fontSize: '0.875rem', marginTop: '0.5rem'}}>
										この板は読み取り専用です
									</p>
								)}
							</div>
							
							<hr style={{margin: '2rem 0'}} />
							
							{isLoading ? (
								<p>読込中...</p>
							) : threads.length === 0 ? (
								<p>スレッドがありません</p>
							) : (
								<>
									<h3>スレッド一覧</h3>
									<ul style={{listStyle: 'none', padding: 0}}>
										{threads.map(thread => (
											<li
												key={thread.id}
												style={{
													padding: '1rem',
													borderBottom: '1px solid #eee',
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
												}}
											>
												<div>
													<Link
														to='/board/$boardKey/thread/$threadId'
														params={{boardKey, threadId: thread.id}}
														style={{
															textDecoration: 'none',
															color: 'var(--color-primary, #1976d2)',
														}}
													>
														<h4 style={{margin: 0, marginBottom: '0.25rem'}}>{thread.title}</h4>
													</Link>
													<small style={{color: '#666'}}>
														投稿数: {thread.postCount} | 最終更新: {new Date(thread.updatedAt).toLocaleString('ja-JP')}
													</small>
												</div>
												<span
													style={{
														padding: '0.25rem 0.5rem',
														borderRadius: '4px',
														fontSize: '0.75rem',
														backgroundColor: thread.status === 'OPEN' ? '#e8f5e9' : '#fce4ec',
														color: thread.status === 'OPEN' ? '#2e7d32' : '#c2185b',
													}}
												>
													{thread.status}
												</span>
											</li>
										))}
									</ul>
									
									{pagination && pagination.totalPages > 1 && (
										<div style={{marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center'}}>
											<button
												onClick={() => {
													setCurrentPage(p => Math.max(1, p - 1));
												}}
												disabled={currentPage === 1}
												style={{padding: '0.5rem 1rem'}}
											>
												前へ
											</button>
											<span>
												{currentPage} / {pagination.totalPages} ページ (全 {pagination.total} 件)
											</span>
											<button
												onClick={() => {
													setCurrentPage(p => Math.min(pagination.totalPages, p + 1));
												}}
												disabled={currentPage === pagination.totalPages}
												style={{padding: '0.5rem 1rem'}}
											>
												次へ
											</button>
										</div>
									)}
								</>
							)}
						</>
					)}
				</div>
			</main>

			<ThreadCreateModal
				isOpen={isCreateModalOpen}
				onClose={() => {
					setIsCreateModalOpen(false);
				}}
				onSuccess={handleThreadCreated}
				boardKey={boardKey}
			/>
		</>
	)
}
