import {createFileRoute} from '@tanstack/react-router';
import {useEffect, useState} from 'react';
import {type InferResponseType} from 'hono/client';
import styles from '../App.module.css';
import {apiClient} from '../lib/api-client.js';

type BoardInfo = InferResponseType<typeof apiClient.api.boards[':boardKey']['$get'], 200>['board'];

export const Route = createFileRoute('/board/$boardKey')({
	component: BoardComponent,
});

function BoardComponent() {
	const {boardKey} = Route.useParams();
	const [board, setBoard] = useState<BoardInfo | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		async function fetchBoard() {
			try {
				const response = await apiClient.api.boards[':boardKey'].$get({
					param: {boardKey},
				});

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
			} finally {
				setIsLoading(false);
			}
		}

		void fetchBoard();
	}, [boardKey]);

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>ふみみちゃんねる</h1>
			</header>

			<main className={styles.main}>
				<div style={{padding: '2rem'}}>
					{isLoading && <p>読込中...</p>}
					{error && <p style={{color: 'red'}}>{error}</p>}
					{!isLoading && !error && board && (
						<>
							<h2>{board.title}</h2>
							{board.description && <p>{board.description}</p>}
							<p>この板のスレッド一覧がここに表示されます</p>
						</>
					)}
				</div>
			</main>
		</div>
	);
}
