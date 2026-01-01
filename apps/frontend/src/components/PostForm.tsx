import {type FormEvent, useState} from 'react';
import {Input, TextArea, Button} from '@repo/ui';
import {apiClient} from '../lib/api-client.js';
import styles from './PostForm.module.css';

type PostFormProps = {
	boardKey: string;
	threadId: string;
	onPostCreated: () => void;
};

export function PostForm({boardKey, threadId, onPostCreated}: PostFormProps) {
	const [name, setName] = useState('');
	const [body, setBody] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError(undefined);

		if (!body.trim()) {
			setError('本文を入力してください');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await apiClient.api.boards[':boardKey'].threads[':threadId'].posts.$post({
				param: {boardKey, threadId},
				json: {
					body: body.trim(),
					name: name.trim() || undefined,
				},
			});

			if (!response.ok) {
				if (response.status === 403) {
					const data = await response.json();
					throw new Error(data.error ?? '投稿できません');
				}

				throw new Error('投稿に失敗しました');
			}

			// フォームをリセット
			setName('');
			setBody('');
			onPostCreated();
		} catch (error_) {
			setError(error_ instanceof Error ? error_.message : '投稿に失敗しました');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.formContainer}>
			<h3 className={styles.formTitle}>返信する</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<Input
						id='name'
						type='text'
						label='名前（任意）'
						value={name}
						onChange={event => {
							setName(event.target.value);
						}}
						placeholder='名無しさん'
						maxLength={255}
						disabled={isSubmitting}
					/>
				</div>

				<div className={styles.formGroup}>
					<TextArea
						id='body'
						label='本文'
						value={body}
						onChange={event => {
							setBody(event.target.value);
						}}
						placeholder='投稿内容を入力してください'
						rows={5}
						required
						disabled={isSubmitting}
					/>
				</div>

				{error && <p className={styles.error}>{error}</p>}

				<div className={styles.actions}>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? '投稿中...' : '投稿する'}
					</Button>
				</div>
			</form>
		</div>
	);
}
