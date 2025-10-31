import React from 'react';
import styles from './Input.module.css';

export interface InputProps {
  /** 入力フィールドのタイプ */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** プレースホルダーテキスト */
  placeholder?: string;
  /** 入力値 */
  value?: string;
  /** デフォルト値 */
  defaultValue?: string;
  /** 変更時のハンドラー */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 無効化状態 */
  disabled?: boolean;
  /** 必須フィールド */
  required?: boolean;
  /** エラー状態 */
  error?: boolean;
  /** サイズ */
  size?: 'sm' | 'md' | 'lg';
  /** フルwidth */
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  required = false,
  error = false,
  size = 'md',
  fullWidth = false,
}) => {
  const className = `${styles.input} ${styles[size]} ${error ? styles.error : ''} ${
    fullWidth ? styles.fullWidth : ''
  }`;

  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      required={required}
    />
  );
};
