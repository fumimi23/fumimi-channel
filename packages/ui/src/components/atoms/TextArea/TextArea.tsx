import React from 'react';
import formControlStyles from '../../../styles/form-control.module.css';
import styles from './TextArea.module.css';

export type TextAreaProps = {
	/** 項目ラベル（必須） */
	label: string;
	/** サポートテキスト（入力条件や例を記述） */
	supportText?: string;
	/** エラーテキスト（配列で複数のエラーを表示可能） */
	errorText?: string[];
	/** プレースホルダーテキスト（非推奨: サポートテキストを使用してください） */
	placeholder?: string;
	/** 入力値 */
	value?: string;
	/** デフォルト値 */
	defaultValue?: string;
	/** 変更時のハンドラー */
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	/** Blur時のハンドラー */
	onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	/** Focus時のハンドラー */
	onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	/** 編集不可状態 */
	readOnly?: boolean;
	/** 必須フィールド */
	required?: boolean;
	/** サイズ */
	size?: 'sm' | 'md' | 'lg';
	/** フルwidth */
	fullWidth?: boolean;
	/** 入力フィールドのID */
	id?: string;
	/** 入力フィールドのname属性 */
	name?: string;
	/** 行数（初期表示） */
	rows?: number;
	/** 最大文字数 */
	maxLength?: number;
	/** 文字数カウンター表示 */
	showCount?: boolean;
	/** リサイズ可否 */
	resize?: 'none' | 'vertical' | 'horizontal' | 'both';
	/** 無効化状態 */
	disabled?: boolean;
	/** Aria-describedby（エラー・サポートテキストとの関連付け） */
	'aria-describedby'?: string;
	/** 追加のクラス名 */
	className?: string;
};

export const TextArea: React.FC<TextAreaProps> = ({
	label,
	supportText,
	errorText,
	placeholder,
	value,
	defaultValue,
	onChange,
	onBlur,
	onFocus,
	readOnly = false,
	required = false,
	size = 'md',
	fullWidth = false,
	id,
	name,
	rows = 4,
	maxLength,
	showCount = false,
	resize = 'vertical',
	disabled = false,
	'aria-describedby': ariaDescribedby,
	className,
}) => {
	// エラーの有無を判定
	const hasError = errorText && errorText.length > 0;

	// ユニークIDの生成
	const textareaId = id ?? `textarea-${React.useId()}`;
	const supportTextId = `${textareaId}-support`;
	const errorTextId = `${textareaId}-error`;

	// Aria-describedby の構築
	const describedByIds = [
		supportText ? supportTextId : '',
		hasError ? errorTextId : '',
		ariaDescribedby ?? '',
	]
		.filter(Boolean)
		.join(' ');

	// テキストエリアのクラス名を構築
	const textareaClassName = [
		styles.textarea,
		styles[size],
		styles[`resize-${resize}`],
		hasError ? styles.error : '',
		readOnly ? styles.readOnly : '',
		fullWidth ? styles.fullWidth : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	// 編集不可テキストのクラス名を構築
	const readOnlyTextClassName = [
		formControlStyles.readOnlyText,
		formControlStyles[size],
		formControlStyles.fullWidth,
		className,
	]
		.filter(Boolean)
		.join(' ');

	// 要否ラベルを自動設定
	const displayRequirementLabel = readOnly ? '編集不可' : (required ? '※必須' : undefined);

	// 現在の文字数を計算
	const currentLength = (value ?? defaultValue ?? '').length;
	const isOverLimit = maxLength ? currentLength > maxLength : false;

	// 文字数カウンターテキスト
	const getCounterText = () => {
		if (!showCount && !maxLength) {
			return null;
		}

		if (maxLength) {
			if (isOverLimit) {
				const overCount = currentLength - maxLength;
				return `${maxLength}文字まで（${overCount}文字オーバー）`;
			}

			return `${currentLength}/${maxLength}`;
		}

		if (showCount) {
			return `${currentLength}文字`;
		}

		return null;
	};

	const counterText = getCounterText();

	return (
		<div className={`${formControlStyles.container} ${fullWidth ? formControlStyles.containerFullWidth : ''}`}>
			{/* 項目ラベルと要否ラベル */}
			<div className={formControlStyles.labelWrapper}>
				<label htmlFor={textareaId} className={formControlStyles.label}>
					{label}
				</label>
				{displayRequirementLabel && (
					<span
						className={`${formControlStyles.requirementLabel} ${
							readOnly ? formControlStyles.requirementLabelReadOnly : ''
						} ${required ? formControlStyles.requirementLabelRequired : ''}`}
					>
						{displayRequirementLabel}
					</span>
				)}
			</div>

			{/* サポートテキスト */}
			{supportText && (
				<div id={supportTextId} className={formControlStyles.supportText}>
					{supportText}
				</div>
			)}

			{/* 入力フィールド - 編集不可の場合はpタグで表示 */}
			{readOnly
				? (
					<p id={textareaId} className={readOnlyTextClassName}>
						{value ?? defaultValue ?? ''}
					</p>
				)
				: (
					<textarea
						id={textareaId}
						name={name}
						className={textareaClassName}
						placeholder={placeholder}
						value={value}
						defaultValue={defaultValue}
						onChange={onChange}
						onBlur={onBlur}
						onFocus={onFocus}
						readOnly={false}
						required={required}
						rows={rows}
						maxLength={maxLength}
						disabled={disabled}
						aria-invalid={hasError}
						aria-describedby={describedByIds || undefined}
						aria-required={required}
					/>
				)}

			{/* 文字数カウンター */}
			{!readOnly && counterText && (
				<div className={`${styles.counter} ${isOverLimit ? styles.counterError : ''}`}>
					{counterText}
				</div>
			)}

			{/* エラーテキスト */}
			{hasError && (
				<div id={errorTextId} className={formControlStyles.errorText} role='alert'>
					{errorText.map((error, index) => (
						<div key={index} className={formControlStyles.errorTextItem}>
							{error}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
