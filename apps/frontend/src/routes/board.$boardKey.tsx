import {createFileRoute, Outlet} from '@tanstack/react-router';
import styles from '../App.module.css';

export const Route = createFileRoute('/board/$boardKey')({
	component: BoardLayoutComponent,
});

function BoardLayoutComponent() {
	return (
		<main className={styles.main}>
			<Outlet />
		</main>
	);
}
