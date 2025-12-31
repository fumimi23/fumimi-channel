import {createFileRoute} from '@tanstack/react-router';
import styles from '../App.module.css';

export const Route = createFileRoute('/board/$boardKey')({
	component: BoardComponent,
});

function BoardComponent() {
	const {boardKey} = Route.useParams();

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>ふみみちゃんねる</h1>
			</header>

			<main className={styles.main}>
				<div style={{padding: '2rem'}}>
					<h1>板: {boardKey}</h1>
					<p>この板のスレッド一覧がここに表示されます</p>
				</div>
			</main>
		</div>
	);
}
