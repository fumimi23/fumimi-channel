import React from 'react';
import { Input } from '../../atoms/Input';
import styles from './FormField.module.css';

export interface FormFieldProps {
  /** ラベルテキスト */
  label: string;
  /** Input コンポーネントに渡すプロパティ */
  inputProps?: React.ComponentProps<typeof Input>;
  /** エラーメッセージ */
  errorMessage?: string;
  /** ヘルプテキスト */
  helpText?: string;
  /** 必須フィールド */
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  inputProps,
  errorMessage,
  helpText,
  required = false,
}) => {
  return (
    <div className={styles.formField}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <Input {...inputProps} error={!!errorMessage} required={required} />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {helpText && !errorMessage && <p className={styles.helpText}>{helpText}</p>}
    </div>
  );
};
