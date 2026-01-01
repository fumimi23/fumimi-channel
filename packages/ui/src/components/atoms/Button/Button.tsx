import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  /** ボタンのテキスト */
  children: React.ReactNode;
  /** ボタンのバリアント */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 無効化状態 */
  disabled?: boolean;
  /** クリック時のハンドラー */
  onClick?: () => void;
  /** ボタンのタイプ */
  type?: 'button' | 'submit' | 'reset';
  /** 関連付けるフォームのID */
  form?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  form,
}) => {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`;

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      form={form}
    >
      {children}
    </button>
  );
};
