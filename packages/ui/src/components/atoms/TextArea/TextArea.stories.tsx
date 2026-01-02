import type {Meta, StoryObj} from '@storybook/react';
import {TextArea} from './TextArea.js';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'サイズ（sm: 36px行高, md: 48px行高, lg: 56px行高）',
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
    showCount: {
      control: 'boolean',
      description: '文字数カウンター表示',
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
    rows: {
      control: 'number',
      description: '行数（初期表示）',
    },
    maxLength: {
      control: 'number',
      description: '最大文字数',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'リサイズ可否',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

// デフォルト（必須フィールド）
export const Default: Story = {
  args: {
    label: 'お問い合わせ内容',
    required: true,
    supportText: 'できるだけ詳しくお書きください。',
    placeholder: '例: サービスについての質問です...',
    rows: 5,
  },
};

// サイズバリエーション
export const SizeSmall: Story = {
  args: {
    label: 'メモ',
    size: 'sm',
    supportText: '短いメモを入力してください。',
    rows: 3,
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'コメント',
    size: 'md',
    required: true,
    supportText: 'ご意見・ご感想をお聞かせください。',
    rows: 4,
  },
};

export const SizeLarge: Story = {
  args: {
    label: '詳細説明',
    size: 'lg',
    required: true,
    supportText: '詳しい状況を教えてください。',
    rows: 6,
  },
};

// 任意フィールド
export const Optional: Story = {
  args: {
    label: '補足事項',
    supportText: '必要に応じて追加情報をご記入ください。',
    rows: 4,
  },
};

// 文字数制限あり（カウンター表示）
export const WithCharacterCount: Story = {
  args: {
    label: '困っていることを100文字以内で教えてください',
    required: true,
    maxLength: 100,
    showCount: true,
    rows: 4,
  },
};

// 文字数制限あり（超過なし）
export const WithCharacterLimit: Story = {
  args: {
    label: 'ご意見を200文字以内でお書きください',
    required: true,
    supportText: '簡潔にまとめてください。',
    maxLength: 200,
    showCount: true,
    value: 'デジタル庁デザインシステムは、行政サービスのユーザビリティ向上を目指しています。',
    rows: 5,
  },
};

// 文字数制限超過
export const CharacterLimitExceeded: Story = {
  args: {
    label: '困っていることを100文字以内で教えてください',
    required: true,
    maxLength: 100,
    showCount: true,
    errorText: ['入力できる文字数を超えています。'],
    value:
      'このテキストは100文字を超えています。デジタル庁デザインシステムを使用することで、一貫性のあるユーザーインターフェースを実現できます。利用者にとって分かりやすく使いやすいサービスを提供することが重要です。',
    rows: 5,
  },
};

// エラー状態
export const WithError: Story = {
  args: {
    label: 'お問い合わせ内容',
    required: true,
    supportText: 'できるだけ詳しくお書きください。',
    errorText: [
      'お問い合わせ内容を入力してください。',
      '10文字以上で入力してください。',
    ],
    value: '短い',
    rows: 5,
  },
};

// 単一のエラー
export const WithSingleError: Story = {
  args: {
    label: 'ご意見・ご感想',
    required: true,
    errorText: ['ご意見・ご感想を入力してください。'],
    rows: 4,
  },
};

// 編集不可フィールド
export const ReadOnly: Story = {
  args: {
    label: '登録済みのコメント',
    supportText: 'この項目は編集できません。',
    value:
      'これは編集不可のテキストです。\n複数行のテキストも表示できます。\nデジタル庁デザインシステムに準拠しています。',
    readOnly: true,
    rows: 5,
  },
};

// リサイズオプション
export const ResizeNone: Story = {
  args: {
    label: 'リサイズ不可',
    supportText: 'このテキストエリアはリサイズできません。',
    resize: 'none',
    rows: 4,
  },
};

export const ResizeVertical: Story = {
  args: {
    label: 'リサイズ可能（縦方向）',
    supportText: '縦方向にサイズを変更できます。',
    resize: 'vertical',
    rows: 4,
  },
};

export const ResizeBoth: Story = {
  args: {
    label: 'リサイズ可能（両方向）',
    supportText: '縦横両方向にサイズを変更できます。',
    resize: 'both',
    rows: 4,
  },
};

// フルwidth
export const FullWidth: Story = {
  args: {
    label: '備考',
    supportText: '自由にご記入ください。',
    fullWidth: true,
    rows: 5,
  },
};

// 実際のフォーム例
export const FormExample: Story = {
  render: () => (
    <div style={{
 maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px',
}}>
      <TextArea
        label='どの機能に問題がありましたか？'
        required
        supportText='該当する機能を選択してください。（この例では省略）'
        rows={2}
        fullWidth
      />
      <TextArea
        label='詳しい状況を教えてください'
        required
        supportText='できるだけ詳しくお書きください。'
        maxLength={200}
        showCount
        rows={5}
        fullWidth
      />
      <TextArea
        label='その他のご意見（任意）'
        supportText='追加でお伝えしたいことがあればご記入ください。'
        rows={4}
        fullWidth
      />
    </div>
  ),
};

// 文字数カウンターのみ（制限なし）
export const CounterOnly: Story = {
  args: {
    label: '自由記述',
    supportText: '文字数が表示されます。',
    showCount: true,
    rows: 5,
  },
};

// 長文入力例
export const LongText: Story = {
  args: {
    label: 'アンケート回答',
    supportText: '率直なご意見をお聞かせください。',
    value:
      'デジタル庁デザインシステムを使用することで、行政サービスのユーザビリティが大幅に向上しました。\n\n特に、一貫性のあるデザインパターンとコンポーネントライブラリにより、開発効率が飛躍的に改善されています。\n\nアクセシビリティへの配慮も素晴らしく、すべての利用者にとって使いやすいサービスを提供できています。',
    readOnly: true,
    rows: 8,
  },
};
