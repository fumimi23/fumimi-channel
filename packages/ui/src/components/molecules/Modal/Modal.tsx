import React, {useEffect, useRef} from 'react';
import styles from './Modal.module.css';

export type ModalProps = {
	/** モーダルの開閉状態 */
	isOpen: boolean;
	/** 閉じるときのハンドラー */
	onClose: () => void;
	/** モーダルのタイトル */
	title: string;
	/** モーダルの内容 */
	children: React.ReactNode;
	/** フッターの内容（ボタンなど） */
	footer?: React.ReactNode;
	/** オーバーレイクリックで閉じるか */
	closeOnOverlayClick?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	footer,
	closeOnOverlayClick = true,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	// モーダルが開いたときに閉じるボタンにフォーカス
	useEffect(() => {
		if (isOpen && closeButtonRef.current) {
			closeButtonRef.current.focus();
		}
	}, [isOpen]);

	// Escapeキーでモーダルを閉じる
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	// モーダルが開いているときはbodyのスクロールを無効化
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	// オーバーレイクリックでモーダルを閉じる
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (closeOnOverlayClick && event.target === event.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modal}>
			<div
				className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
				onClick={handleOverlayClick}
				aria-hidden='true'
			/>
			<div
				ref={modalRef}
				className={`${styles.modalContent} ${isOpen ? styles.modalContentOpen : ''}`}
				role='dialog'
				aria-modal='true'
				aria-labelledby='modal-title'
			>
				<div className={styles.header}>
					<h2 id='modal-title' className={styles.title}>
						{title}
					</h2>
					<button
						ref={closeButtonRef}
						className={styles.closeButton}
						onClick={onClose}
						aria-label='閉じる'
						type='button'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
						>
							<path
								d='M18 6L6 18M6 6l12 12'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
				<div className={styles.body}>
					{children}
				</div>
				{footer && (
					<div className={styles.footer}>
						{footer}
					</div>
				)}
			</div>
		</div>
	);
};
