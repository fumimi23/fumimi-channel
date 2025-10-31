import type { Meta } from '@storybook/react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { FormField } from '../molecules/FormField';
import { ThemeToggle } from '../atoms/ThemeToggle';

const meta: Meta = {
  title: 'Design System/Dark Mode',
  parameters: {
    docs: {
      description: {
        component: 'ライトモードとダークモードの両方をサポートするデザインシステム。システム設定の自動検出と手動切り替えに対応しています。',
      },
    },
  },
};

export default meta;

export const Overview = () => (
  <div style={{ padding: '24px' }}>
    <h1 style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>ダークモード対応</h1>
    
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>テーマ切り替え</h2>
      <ThemeToggle />
    </div>

    <div style={{ 
      padding: '24px', 
      backgroundColor: 'var(--background-secondary)', 
      borderRadius: '8px',
      marginBottom: '32px',
      border: '1px solid var(--border-default)'
    }}>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>実装方法</h3>
      <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <li>CSS変数でセマンティックトークンを定義</li>
        <li><code style={{ backgroundColor: 'var(--surface-active)', padding: '2px 6px', borderRadius: '4px' }}>prefers-color-scheme</code> でシステム設定を自動検出</li>
        <li><code style={{ backgroundColor: 'var(--surface-active)', padding: '2px 6px', borderRadius: '4px' }}>data-theme</code> 属性で手動切り替え</li>
        <li>すべてのコンポーネントがセマンティックトークンを使用</li>
      </ul>
    </div>

    <div style={{ 
      padding: '24px', 
      backgroundColor: 'var(--background-secondary)', 
      borderRadius: '8px',
      border: '1px solid var(--border-default)'
    }}>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>セマンティックトークン</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { token: '--text-primary', label: 'Primary Text' },
          { token: '--text-secondary', label: 'Secondary Text' },
          { token: '--text-tertiary', label: 'Tertiary Text' },
          { token: '--background-primary', label: 'Primary BG' },
          { token: '--background-secondary', label: 'Secondary BG' },
          { token: '--surface-default', label: 'Surface' },
          { token: '--border-default', label: 'Border' },
        ].map((item) => (
          <div key={item.token} style={{ 
            padding: '12px', 
            backgroundColor: 'var(--surface-default)',
            borderRadius: '6px',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              {item.token}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Components = () => (
  <div style={{ padding: '24px', maxWidth: '800px' }}>
    <div style={{ marginBottom: '32px' }}>
      <ThemeToggle />
    </div>

    <h2 style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
      コンポーネント例
    </h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Buttons */}
      <section>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '16px' }}>
          Buttons
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '16px' }}>
          Inputs
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Input label="氏名" placeholder="山田 太郎" />
          <Input label="メールアドレス" placeholder="example@example.com" errorText={['メールアドレスの形式が正しくありません。']} />
          <Input label="電話番号" placeholder="03-1234-5678" disabled />
        </div>
      </section>

      {/* Form Fields */}
      <section>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '16px' }}>
          Form Fields
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <FormField
            label="メールアドレス"
            inputProps={{ label: 'メールアドレス', type: 'email', placeholder: 'example@example.com', supportText: '登録済みのメールアドレスを入力してください' }}
          />
          <FormField
            label="パスワード"
            inputProps={{ label: 'パスワード', type: 'password', placeholder: '8文字以上', required: true }}
          />
          <FormField
            label="確認コード"
            inputProps={{ label: '確認コード', type: 'text', value: '123', errorText: ['無効な確認コードです'] }}
          />
        </div>
      </section>

      {/* Cards */}
      <section>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '16px' }}>
          Cards
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'var(--surface-default)', 
            borderRadius: '8px',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>
              カードタイトル
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
              カードの説明文がここに入ります。ダークモードでも読みやすい色になります。
            </p>
          </div>
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'var(--background-secondary)', 
            borderRadius: '8px',
            border: '1px solid var(--border-default)'
          }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>
              別の背景色
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
              異なる背景色のバリエーションも用意されています。
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export const ColorPalette = () => (
  <div style={{ padding: '24px' }}>
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>カラーパレット比較</h2>
      <ThemeToggle />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {/* Background Colors */}
      <div>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '16px' }}>
          Background
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['primary', 'secondary', 'tertiary', 'elevated'].map((level) => (
            <div
              key={level}
              style={{
                padding: '16px',
                backgroundColor: `var(--background-${level})`,
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
              }}
            >
              <div style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                background-{level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '16px' }}>
          Text
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['primary', 'secondary', 'tertiary', 'disabled'].map((level) => (
            <div
              key={level}
              style={{
                padding: '16px',
                backgroundColor: 'var(--surface-default)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
              }}
            >
              <div style={{ color: `var(--text-${level})`, fontSize: '14px' }}>
                text-{level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Surface Colors */}
      <div>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '16px' }}>
          Surface
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['default', 'hover', 'active', 'disabled'].map((state) => (
            <div
              key={state}
              style={{
                padding: '16px',
                backgroundColor: `var(--surface-${state})`,
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
              }}
            >
              <div style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                surface-{state}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
