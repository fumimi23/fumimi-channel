import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import {useEffect, useState} from 'react';
import {type InferResponseType} from 'hono/client';
import {apiClient} from '../lib/api-client.js';

type BoardCategory = InferResponseType<typeof apiClient.api.boards.$get>['categories'][number];

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const [categories, setCategories] = useState<BoardCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		async function fetchBoards() {
			try {
				const response = await apiClient.api.boards.$get();

				if (!response.ok) {
					throw new Error('Failed to fetch boards');
				}

				const data = await response.json();
				setCategories(data.categories);
			} catch (error_) {
				setError(error_ instanceof Error ? error_.message : 'Unknown error');
			} finally {
				setIsLoading(false);
			}
		}

		void fetchBoards();
	}, []);

	return (
		<div style={{display: 'flex', minHeight: '100vh'}}>
			<nav
				style={{
					width: '15.625rem',
					padding: '1rem',
					borderRight: '1px solid #ccc',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				<Link to='/' className='[&.active]:font-bold'>
					Home
				</Link>
				<Link to='/about' className='[&.active]:font-bold'>
					About
				</Link>

				<hr style={{margin: '1rem 0', border: 'none', borderTop: '1px solid #ccc'}} />

				<div style={{fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
					掲示板一覧
				</div>

				{isLoading && <div style={{fontSize: '0.875rem', color: '#666'}}>読込中...</div>}
				{error && <div style={{fontSize: '0.875rem', color: 'red'}}>{error}</div>}
				{!isLoading && !error && categories.length === 0 && (
					<div style={{fontSize: '0.875rem', color: '#666'}}>カテゴリがありません</div>
				)}
				{!isLoading && !error && categories.map(category => (
					<div key={category.id} style={{marginBottom: '1.5rem'}}>
						<div style={{
							fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333',
						}}>
							{category.name}
						</div>
						{category.description && (
							<div style={{fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem'}}>
								{category.description}
							</div>
						)}
						{category.boards.length === 0
							? (
								<div style={{fontSize: '0.75rem', color: '#999', marginLeft: '0.5rem'}}>
									掲示板なし
								</div>
							)
							: (
								<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
									{category.boards.map(board => (
										<div key={board.key} style={{fontSize: '0.875rem', paddingLeft: '0.5rem'}}>
											<Link
												to={`/board/${board.key}`}
												style={{fontWeight: 'bold', textDecoration: 'none', color: 'inherit'}}
												className='hover:underline'
											>
												{board.title}
											</Link>
										</div>
									))}
								</div>
							)}
					</div>
				))}
			</nav>
			<div style={{flex: 1}}>
				<Outlet />
				<TanStackRouterDevtools />
			</div>
		</div>
	);
}
