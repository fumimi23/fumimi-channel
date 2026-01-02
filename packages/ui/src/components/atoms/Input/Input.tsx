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

const buildClassNames = (
	baseClasses: string[],
	additionalClassName?: string,
): string => [
	...baseClasses,
	additionalClassName,
]
	.filter(Boolean)
	.join(' ');

const getRequirementLabel = (readOnly: boolean, required: boolean): string | undefined => {
	if (readOnly) {
return '編集不可';
}

	if (required) {
return '※必須';
}

	return undefined;
};

const RequirementLabel: React.FC<{
	label: string;
	readOnly: boolean;
	required: boolean;
}> = ({label, readOnly, required}) => (
	<span
		className={buildClassNames([
			formControlStyles.requirementLabel ?? '',
			readOnly ? formControlStyles.requirementLabelReadOnly ?? '' : '',
			required ? formControlStyles.requirementLabelRequired ?? '' : '',
		])}
	>
		{label}
	</span>
);

const SupportText: React.FC<{id: string; text: string}> = ({id, text}) => (
	<div id={id} className={formControlStyles.supportText}>
		{text}
	</div>
);

const ErrorText: React.FC<{id: string; errors: string[]}> = ({id, errors}) => (
	<div id={id} className={formControlStyles.errorText} role='alert'>
		{errors.map((error, index) => (
			<div key={index} className={formControlStyles.errorTextItem}>
				{error}
			</div>
		))}
	</div>
);

const ReadOnlyInput: React.FC<{
	id: string;
	className: string;
	value?: string;
	defaultValue?: string;
}> = ({id, className, value, defaultValue}) => (
	<p id={id} className={className}>
		{value ?? defaultValue ?? ''}
	</p>
);

const EditableInput: React.FC<{
	id: string;
	type: string;
	name?: string;
	className: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	required: boolean;
	autoComplete?: string;
	maxLength?: number;
	disabled: boolean;
	hasError: boolean;
	describedByIds: string;
}> = ({
	id,
	type,
	name,
	className,
	placeholder,
	value,
	defaultValue,
	onChange,
	onBlur,
	onFocus,
	required,
	autoComplete,
	maxLength,
	disabled,
	hasError,
	describedByIds,
}) => (
	<input
		id={id}
		type={type}
		name={name}
		className={className}
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
);

const LabelSection: React.FC<{
	inputId: string;
	label: string;
	displayRequirementLabel?: string;
	readOnly: boolean;
	required: boolean;
}> = ({inputId, label, displayRequirementLabel, readOnly, required}) => (
	<div className={formControlStyles.labelWrapper}>
		<label htmlFor={inputId} className={formControlStyles.label}>
			{label}
		</label>
		{displayRequirementLabel && (
			<RequirementLabel
				label={displayRequirementLabel}
				readOnly={readOnly}
				required={required}
			/>
		)}
	</div>
);

const buildInputClassName = (options: {
	size: 'sm' | 'md' | 'lg';
	hasError: boolean;
	readOnly: boolean;
	fullWidth: boolean;
	className?: string;
}): string => buildClassNames(
	[
		styles.input ?? '',
		styles[options.size] ?? '',
		options.hasError ? styles.error ?? '' : '',
		options.readOnly ? styles.readOnly ?? '' : '',
		options.fullWidth ? styles.fullWidth ?? '' : '',
	],
	options.className,
);

const buildReadOnlyClassName = (
	size: 'sm' | 'md' | 'lg',
	className?: string,
): string => buildClassNames(
	[formControlStyles.readOnlyText ?? '', formControlStyles[size] ?? ''],
	className,
);

const buildContainerClassName = (fullWidth: boolean): string => buildClassNames([
	formControlStyles.container ?? '',
	fullWidth ? formControlStyles.containerFullWidth ?? '' : '',
]);

const buildDescribedByIds = (options: {
	supportText: string | undefined;
	supportTextId: string;
	hasError: boolean;
	errorTextId: string;
	ariaDescribedby: string | undefined;
}): string => buildClassNames([
	options.supportText ? options.supportTextId : '',
	options.hasError ? options.errorTextId : '',
	options.ariaDescribedby ?? '',
]);

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
	const hasError = Boolean(errorText && errorText.length > 0);
	const inputId = id ?? `input-${React.useId()}`;
	const supportTextId = `${inputId}-support`;
	const errorTextId = `${inputId}-error`;

	const describedByIds = buildDescribedByIds({
		supportText,
		supportTextId,
		hasError,
		errorTextId,
		ariaDescribedby,
	});

	const inputClassName = buildInputClassName({
size, hasError, readOnly, fullWidth, className,
});
	const readOnlyTextClassName = buildReadOnlyClassName(size, className);
	const displayRequirementLabel = getRequirementLabel(readOnly, required);
	const containerClassName = buildContainerClassName(fullWidth);

	return (
		<div className={containerClassName}>
			<LabelSection
				inputId={inputId}
				label={label}
				displayRequirementLabel={displayRequirementLabel}
				readOnly={readOnly}
				required={required}
			/>

			{supportText && <SupportText id={supportTextId} text={supportText} />}

			{readOnly
? (
				<ReadOnlyInput
					id={inputId}
					className={readOnlyTextClassName}
					value={value}
					defaultValue={defaultValue}
				/>
			)
: (
				<EditableInput
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
					required={required}
					autoComplete={autoComplete}
					maxLength={maxLength}
					disabled={disabled}
					hasError={hasError}
					describedByIds={describedByIds}
				/>
			)}

			{hasError && <ErrorText id={errorTextId} errors={errorText ?? []} />}
		</div>
	);
};
