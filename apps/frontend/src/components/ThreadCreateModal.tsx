import React, {useState} from 'react';
import {
	Modal, Input, TextArea, Button,
} from '@repo/ui';
import styles from './ThreadCreateModal.module.css';

export type ThreadCreateModalProps = {
	/** モーダルの開閉状態 */
	isOpen: boolean;
	/** 閉じるときのハンドラー */
	onClose: () => void;
	/** スレッド作成成功時のハンドラー */
	onSuccess?: () => void;
	/** 板のキー */
	boardKey: string;
};

export const ThreadCreateModal: React.FC<ThreadCreateModalProps> = ({
	isOpen,
	onClose,
	onSuccess,
	boardKey,
}) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(undefined);
		setIsLoading(true);

		try {
			const response = await fetch(`/api/boards/${boardKey}/threads`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({title, body, name: name.trim() || undefined}),
			});

			if (!response.ok) {
				const errorData = await response.json() as {error?: string};
				throw new Error(errorData.error ?? 'スレッドの作成に失敗しました');
			}

			// 成功時はフォームをリセット
			setTitle('');
			setBody('');
			setName('');
			onClose();

			// 成功ハンドラーを呼び出す
			if (onSuccess) {
				onSuccess();
			}
		} catch (error_) {
			setError(error_ instanceof Error ? error_.message : 'Unknown error');
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		if (!isLoading) {
			setTitle('');
			setBody('');
			setName('');
			setError(undefined);
			onClose();
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			title='新規スレッド作成'
			closeOnOverlayClick={!isLoading}
			footer={
				<div className={styles.actions}>
					<Button
						variant='outline'
						onClick={handleClose}
						disabled={isLoading}
					>
						キャンセル
					</Button>
					<Button
						type='submit'
						form='thread-create-form'
						disabled={isLoading || !title.trim() || !body.trim()}
					>
						{isLoading ? '作成中...' : '作成'}
					</Button>
				</div>
			}
		>
			<form id='thread-create-form' className={styles.form} onSubmit={handleSubmit}>
				<Input
					label='スレッドタイトル'
					value={title}
					onChange={event => {
						setTitle(event.target.value);
					}}
					required
					fullWidth
					supportText='スレッドのタイトルを入力してください（最大255文字）'
					maxLength={255}
					disabled={isLoading}
				/>
				<Input
					label='投稿者名'
					value={name}
					onChange={event => {
						setName(event.target.value);
					}}
					fullWidth
					supportText='投稿者名（省略すると匿名になります）'
					maxLength={255}
					disabled={isLoading}
				/>
				<TextArea
					label='本文'
					value={body}
					onChange={event => {
						setBody(event.target.value);
					}}
					required
					fullWidth
					rows={8}
					supportText='最初の投稿内容を入力してください'
					disabled={isLoading}
				/>
				{error && <p className={styles.error}>{error}</p>}
			</form>
		</Modal>
	);
};
