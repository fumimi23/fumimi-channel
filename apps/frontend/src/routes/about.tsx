import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
	component: About,
});

function About() {
	return (
		<div style={{padding: '2rem'}}>
			<h1>About</h1>
			<p>This is a sample page demonstrating TanStack Router.</p>
			<p>
				TanStack Router provides type-safe routing with excellent developer
				experience.
			</p>
		</div>
	);
}
