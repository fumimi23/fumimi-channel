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
	/** KeyDown時のハンドラー */
	onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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

const getCounterText = (
	showCount: boolean,
	maxLength: number | undefined,
	currentLength: number,
	isOverLimit: boolean,
): string | undefined => {
	if (!showCount && !maxLength) {
return undefined;
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

const Counter: React.FC<{text: string; isError: boolean}> = ({text, isError}) => (
	<div className={buildClassNames([styles.counter ?? '', isError ? styles.counterError ?? '' : ''])}>
		{text}
	</div>
);

const ReadOnlyTextArea: React.FC<{
	id: string;
	className: string;
	value?: string;
	defaultValue?: string;
}> = ({id, className, value, defaultValue}) => (
	<p id={id} className={className}>
		{value ?? defaultValue ?? ''}
	</p>
);

const EditableTextArea: React.FC<{
	id: string;
	name?: string;
	className: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	required: boolean;
	rows: number;
	maxLength?: number;
	disabled: boolean;
	hasError: boolean;
	describedByIds: string;
}> = ({
	id,
	name,
	className,
	placeholder,
	value,
	defaultValue,
	onChange,
	onBlur,
	onFocus,
	onKeyDown,
	required,
	rows,
	maxLength,
	disabled,
	hasError,
	describedByIds,
}) => (
	<textarea
		id={id}
		name={name}
		className={className}
		placeholder={placeholder}
		value={value}
		defaultValue={defaultValue}
		onChange={onChange}
		onBlur={onBlur}
		onFocus={onFocus}
		onKeyDown={onKeyDown}
		readOnly={false}
		required={required}
		rows={rows}
		maxLength={maxLength}
		disabled={disabled}
		aria-invalid={hasError}
		aria-describedby={describedByIds || undefined}
		aria-required={required}
	/>
);

const LabelSection: React.FC<{
	textareaId: string;
	label: string;
	displayRequirementLabel?: string;
	readOnly: boolean;
	required: boolean;
}> = ({textareaId, label, displayRequirementLabel, readOnly, required}) => (
	<div className={formControlStyles.labelWrapper}>
		<label htmlFor={textareaId} className={formControlStyles.label}>
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

const buildTextAreaClassName = (options: {
	size: 'sm' | 'md' | 'lg';
	resize: 'none' | 'vertical' | 'horizontal' | 'both';
	hasError: boolean;
	readOnly: boolean;
	fullWidth: boolean;
	className?: string;
}): string => buildClassNames(
	[
		styles.textarea ?? '',
		styles[options.size] ?? '',
		styles[`resize-${options.resize}`] ?? '',
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
	[
		formControlStyles.readOnlyText ?? '',
		formControlStyles[size] ?? '',
		formControlStyles.fullWidth ?? '',
	],
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
	onKeyDown,
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
	const hasError = Boolean(errorText && errorText.length > 0);
	const textareaId = id ?? `textarea-${React.useId()}`;
	const supportTextId = `${textareaId}-support`;
	const errorTextId = `${textareaId}-error`;

	const describedByIds = buildDescribedByIds({
		supportText,
		supportTextId,
		hasError,
		errorTextId,
		ariaDescribedby,
	});

	const textareaClassName = buildTextAreaClassName({
		size,
		resize,
		hasError,
		readOnly,
		fullWidth,
		className,
	});

	const readOnlyTextClassName = buildReadOnlyClassName(size, className);
	const displayRequirementLabel = getRequirementLabel(readOnly, required);
	const containerClassName = buildContainerClassName(fullWidth);

	const currentLength = (value ?? defaultValue ?? '').length;
	const isOverLimit = maxLength ? currentLength > maxLength : false;
	const counterText = getCounterText(showCount, maxLength, currentLength, isOverLimit);

	return (
		<div className={containerClassName}>
			<LabelSection
				textareaId={textareaId}
				label={label}
				displayRequirementLabel={displayRequirementLabel}
				readOnly={readOnly}
				required={required}
			/>

			{supportText && <SupportText id={supportTextId} text={supportText} />}

			{readOnly
? (
				<ReadOnlyTextArea
					id={textareaId}
					className={readOnlyTextClassName}
					value={value}
					defaultValue={defaultValue}
				/>
			)
: (
				<EditableTextArea
					id={textareaId}
					name={name}
					className={textareaClassName}
					placeholder={placeholder}
					value={value}
					defaultValue={defaultValue}
					onChange={onChange}
					onBlur={onBlur}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					required={required}
					rows={rows}
					maxLength={maxLength}
					disabled={disabled}
					hasError={hasError}
					describedByIds={describedByIds}
				/>
			)}

			{!readOnly && counterText && <Counter text={counterText} isError={isOverLimit} />}

			{hasError && <ErrorText id={errorTextId} errors={errorText ?? []} />}
		</div>
	);
};
