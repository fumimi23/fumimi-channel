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
			<section className={styles.section}>
				<h2>UI Components from @repo/ui</h2>

				<div className={styles.components}>
					<div className={styles.component}>
						<h3>Button</h3>
						<Button onClick={() => {
							// eslint-disable-next-line no-alert
							alert('Button clicked!');
						}}>
							Click Me
						</Button>
					</div>

					<div className={styles.component}>
						<h3>Input</h3>
						<Input
							type='text'
							label='Name'
							placeholder='Enter your name...'
						/>
					</div>

					<div className={styles.component}>
						<h3>TextArea</h3>
						<TextArea
							label='Message'
							placeholder='Enter your message...'
							rows={4}
						/>
					</div>
				</div>
			</section>
		</main>
	);
}
