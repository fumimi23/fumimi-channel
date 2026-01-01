import {createFileRoute} from '@tanstack/react-router';
import {Button, Input, TextArea} from '@repo/ui';
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
