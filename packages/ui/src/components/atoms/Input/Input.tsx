import React from 'react';
import formControlStyles from '../../../styles/form-control.module.css';
import styles from './Input.module.css';

export type InputProps = {
	/** 入力フィールドのタイプ */
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
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
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Blur時のハンドラー */
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/** Focus時のハンドラー */
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
	/** Autocomplete属性（アクセシビリティ向上） */
	autoComplete?: string;
	/** 最大文字数 */
	maxLength?: number;
	/** 無効化状態 */
	disabled?: boolean;
	/** Aria-describedby（エラー・サポートテキストとの関連付け） */
	'aria-describedby'?: string;
	/** 追加のクラス名 */
	className?: string;
};

export const Input: React.FC<InputProps> = ({
	type = 'text',
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
	autoComplete,
	maxLength,
	disabled = false,
	'aria-describedby': ariaDescribedby,
	className,
}) => {
	// エラーの有無を判定
	const hasError = errorText && errorText.length > 0;

	// ユニークIDの生成
	const inputId = id || `input-${React.useId()}`;
	const supportTextId = `${inputId}-support`;
	const errorTextId = `${inputId}-error`;

	// Aria-describedby の構築
	const describedByIds = [
		supportText ? supportTextId : '',
		hasError ? errorTextId : '',
		ariaDescribedby || '',
	]
		.filter(Boolean)
		.join(' ');

	// 入力フィールドのクラス名を構築
	const inputClassName = [
		styles.input,
		styles[size],
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
		className,
	]
		.filter(Boolean)
		.join(' ');

	// 要否ラベルを自動設定
	const displayRequirementLabel = readOnly ? '編集不可' : (required ? '※必須' : undefined);

	return (
		<div className={`${formControlStyles.container} ${fullWidth ? formControlStyles.containerFullWidth : ''}`}>
			{/* 項目ラベルと要否ラベル */}
			<div className={formControlStyles.labelWrapper}>
				<label htmlFor={inputId} className={formControlStyles.label}>
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
					<p id={inputId} className={readOnlyTextClassName}>
						{value || defaultValue || ''}
					</p>
				)
				: (
					<input
						id={inputId}
						type={type}
						name={name}
						className={inputClassName}
						placeholder={placeholder}
						value={value}
						defaultValue={defaultValue}
						onChange={onChange}
						onBlur={onBlur}
						onFocus={onFocus}
						readOnly={false}
						required={required}
						autoComplete={autoComplete}
						maxLength={maxLength}
						disabled={disabled}
						aria-invalid={hasError}
						aria-describedby={describedByIds || undefined}
						aria-required={required}
					/>
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
