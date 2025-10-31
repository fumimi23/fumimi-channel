import React from 'react';
import styles from './Input.module.css';

export interface InputProps {
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
  /** 無効化状態（非推奨: 使用を避けてください） */
  disabled?: boolean;
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
  /** autocomplete属性（アクセシビリティ向上） */
  autoComplete?: string;
  /** aria-describedby（エラー・サポートテキストとの関連付け） */
  'aria-describedby'?: string;
  /** 追加のクラス名 */
  className?: string;
}

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
  disabled = false,
  readOnly = false,
  required = false,
  size = 'md',
  fullWidth = false,
  id,
  name,
  autoComplete,
  'aria-describedby': ariaDescribedby,
  className,
}) => {
  // エラーの有無を判定
  const hasError = errorText && errorText.length > 0;

  // ユニークIDの生成
  const inputId = id || `input-${React.useId()}`;
  const supportTextId = `${inputId}-support`;
  const errorTextId = `${inputId}-error`;

  // aria-describedby の構築
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
    styles.readOnlyText,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 要否ラベルを自動設定
  const displayRequirementLabel = readOnly ? '編集不可' : required ? '※必須' : undefined;

  return (
    <div className={`${styles.container} ${fullWidth ? styles.containerFullWidth : ''}`}>
      {/* 項目ラベルと要否ラベル */}
      <div className={styles.labelWrapper}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        {displayRequirementLabel && (
          <span
            className={`${styles.requirementLabel} ${
              readOnly ? styles.requirementLabelReadOnly : ''
            } ${required ? styles.requirementLabelRequired : ''}`}
          >
            {displayRequirementLabel}
          </span>
        )}
      </div>

      {/* サポートテキスト */}
      {supportText && (
        <div id={supportTextId} className={styles.supportText}>
          {supportText}
        </div>
      )}

      {/* 入力フィールド - 編集不可の場合はpタグで表示 */}
      {readOnly ? (
        <p id={inputId} className={readOnlyTextClassName}>
          {value || defaultValue || ''}
        </p>
      ) : (
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
          disabled={disabled}
          readOnly={false}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={describedByIds || undefined}
          aria-required={required}
        />
      )}

      {/* エラーテキスト */}
      {hasError && (
        <div id={errorTextId} className={styles.errorText} role="alert">
          {errorText.map((error, index) => (
            <div key={index} className={styles.errorTextItem}>
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
