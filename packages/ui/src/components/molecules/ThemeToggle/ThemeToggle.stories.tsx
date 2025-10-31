import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'ライトモード、ダークモード、システム設定を切り替えるトグルボタン。3つのボタンで構成される複合コンポーネントです。選択したテーマはlocalStorageに保存されます。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {
    defaultTheme: 'system',
  },
};

export const Light: Story = {
  args: {
    defaultTheme: 'light',
  },
};

export const Dark: Story = {
  args: {
    defaultTheme: 'dark',
  },
};

export const WithCallback: Story = {
  args: {
    defaultTheme: 'system',
    onThemeChange: (theme) => {
      console.log('Theme changed to:', theme);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'テーマ変更時にコールバック関数を実行する例。コンソールでテーマの変更を確認できます。',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>テーマトグル</h3>
        <ThemeToggle />
      </div>
      <div style={{ 
        padding: '24px', 
        backgroundColor: 'var(--background-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--border-default)'
      }}>
        <p style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
          このカードは現在のテーマに応じて色が変わります。
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          上のトグルボタンでテーマを切り替えてみてください。
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'テーマトグルの動作を確認できるインタラクティブな例。',
      },
    },
  },
};
