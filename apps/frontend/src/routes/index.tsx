import {createFileRoute} from '@tanstack/react-router';
import styles from '../App.module.css';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	document.title = 'ふみみちゃんねる';
	return (

		<main className={styles.main}>
			<p>ようこそ、ふみみちゃんねるへ！</p>
		</main>
	);
}
