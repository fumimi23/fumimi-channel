import {createFileRoute, Outlet} from '@tanstack/react-router';
import styles from '../App.module.css';

export const Route = createFileRoute('/board/$boardKey')({
	component: BoardLayoutComponent,
});

function BoardLayoutComponent() {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>ふみみちゃんねる</h1>
			</header>

			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}
