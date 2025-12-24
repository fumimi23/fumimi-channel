import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: '入力フィールドのタイプ',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'サイズ（sm: 36px, md: 48px, lg: 56px）',
    },
    readOnly: {
      control: 'boolean',
      description: '編集不可状態',
    },
    required: {
      control: 'boolean',
      description: '必須フィールド',
    },
    fullWidth: {
      control: 'boolean',
      description: 'フルwidth',
    },
    errorText: {
      control: 'text',
      description: 'エラーテキスト（文字列または配列）',
    },
    supportText: {
      control: 'text',
      description: 'サポートテキスト（入力条件や例を記述）',
    },
    label: {
      control: 'text',
      description: '項目ラベル（必須）',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト（非推奨: サポートテキストを使用してください）',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// デフォルト（必須フィールド）
export const Default: Story = {
  args: {
    label: '氏名',
    required: true,
    supportText: '氏と名を空白で区切ってください。',
    placeholder: '例: 山田 太郎',
  },
};

// サイズバリエーション
export const SizeSmall: Story = {
  args: {
    label: '郵便番号',
    size: 'sm',
    supportText: '半角数字のみ',
    placeholder: '1234567',
  },
};

export const SizeMedium: Story = {
  args: {
    label: '電話番号',
    size: 'md',
    required: true,
    supportText: '半角数字とハイフンで入力してください。',
    placeholder: '03-1234-5678',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'メールアドレス',
    size: 'lg',
    required: true,
    type: 'email',
    autoComplete: 'email',
  },
};

// 任意フィールド
export const Optional: Story = {
  args: {
    label: 'ミドルネーム',
    supportText: 'ある場合のみ入力してください。',
  },
};

// エラー状態
export const WithError: Story = {
  args: {
    label: '氏名（カタカナ）',
    required: true,
    supportText: '氏（カタカナ）と名（カタカナ）を空白で区切ってください。',
    errorText: [
      '氏名をカタカナで入力してください。',
      '氏（カタカナ）と名（カタカナ）を空白で区切ってください。',
    ],
    value: 'デジ太太郎',
  },
};

// 単一のエラー
export const WithSingleError: Story = {
  args: {
    label: 'メールアドレス',
    required: true,
    type: 'email',
    errorText: ['メールアドレスの形式が正しくありません。'],
    value: 'invalid-email',
  },
};

// 空欄エラー
export const EmptyFieldError: Story = {
  args: {
    label: '氏名',
    required: true,
    supportText: '氏と名を空白で区切ってください。',
    errorText: [
      '氏名を入力してください。',
      '氏と名を空白で区切ってください。',
    ],
  },
};

// 編集不可フィールド
export const ReadOnly: Story = {
  args: {
    label: '住所',
    supportText: 'この項目は自動入力されたので変更できません。',
    value: '東京都千代田区霞が関1-2-3',
    readOnly: true,
  },
};

// 各種入力タイプ
export const EmailInput: Story = {
  args: {
    label: 'メールアドレス',
    required: true,
    type: 'email',
    autoComplete: 'email',
    supportText: 'ログインに使用するメールアドレスを入力してください。',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'パスワード',
    required: true,
    type: 'password',
    autoComplete: 'new-password',
    supportText: '8文字以上の英数字を含めてください。',
  },
};

export const TelInput: Story = {
  args: {
    label: '電話番号',
    required: true,
    type: 'tel',
    autoComplete: 'tel',
    supportText: 'ハイフンを含めて入力してください。',
    placeholder: '03-1234-5678',
  },
};

export const NumberInput: Story = {
  args: {
    label: '年齢',
    required: true,
    type: 'number',
    supportText: '半角数字で入力してください。',
  },
};

// フルwidth
export const FullWidth: Story = {
  args: {
    label: '備考',
    supportText: '自由にご記入ください。',
    fullWidth: true,
  },
};

// 実際のフォーム例
export const FormExample: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Input
        label="氏名"
        required
        supportText="氏と名を空白で区切ってください。"
        placeholder="例: 山田 太郎"
        fullWidth
      />
      <Input
        label="氏名（カタカナ）"
        required
        supportText="氏（カタカナ）と名（カタカナ）を空白で区切ってください。"
        placeholder="例: ヤマダ タロウ"
        fullWidth
      />
      <Input
        label="メールアドレス"
        required
        type="email"
        autoComplete="email"
        supportText="ログインに使用するメールアドレスを入力してください。"
        fullWidth
      />
      <Input
        label="電話番号"
        type="tel"
        autoComplete="tel"
        supportText="ハイフンを含めて入力してください。"
        placeholder="03-1234-5678"
        fullWidth
      />
    </div>
  ),
};
