import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {useState} from 'react';
import {Button} from '../../atoms/Button/index.js';
import {Drawer} from './Drawer.js';

const meta = {
  title: 'Molecules/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ドロワー

デジタル庁デザインシステム準拠のドロワーコンポーネントです。

## 仕様

- ドロワーは必ずモーダルモードを持ちます
- エレベーション（影）が設定され、親要素はオーバーレイシェードで覆われます
- ドロワー内部に配置されたコンテンツやリンク以外にはアクセスできません
- 「閉じる」ボタンの押下によりドロワーを閉じることができます
- Escapeキーでも閉じることができます
- オーバーレイをクリックすることで閉じることができます

## 展開パターン

- **全面オーバーレイ (full)**: 画面全体を覆うパターン
- **左からのオーバーレイ (left)**: 画面左端から展開するパターン
- **右からのオーバーレイ (right)**: 画面右端から展開するパターン

## 参考

- [デジタル庁デザインシステム - ドロワー](https://design.digital.go.jp/dads/components/drawer/)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'ドロワーの開閉状態',
    },
    position: {
      control: 'select',
      options: ['full', 'left', 'right'],
      description: 'ドロワーの展開パターン',
    },
    title: {
      control: 'text',
      description: 'ドロワーのタイトル（aria-labelに使用）',
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// 左からのオーバーレイ（デフォルト）
export const LeftOverlay: Story = {
  render(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div style={{padding: '2rem'}}>
          <Button onClick={() => {
 setIsOpen(true);
}}>
            ドロワーを開く（左から）
          </Button>
        </div>
        <Drawer {...args} isOpen={isOpen} onClose={() => {
 setIsOpen(false);
}}>
          <nav>
            <h2 style={{marginTop: 0, fontSize: '1.5rem', fontWeight: 700}}>
              メニュー
            </h2>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '1rem'}}>
                <a
                  href='#'
                  style={{
                    color: 'var(--color-link)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                  }}
                >
                  ホーム
                </a>
              </li>
              <li style={{marginBottom: '1rem'}}>
                <a
                  href='#'
                  style={{
                    color: 'var(--color-link)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                  }}
                >
                  サービス一覧
                </a>
              </li>
              <li style={{marginBottom: '1rem'}}>
                <a
                  href='#'
                  style={{
                    color: 'var(--color-link)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                  }}
                >
                  お知らせ
                </a>
              </li>
              <li style={{marginBottom: '1rem'}}>
                <a
                  href='#'
                  style={{
                    color: 'var(--color-link)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                  }}
                >
                  お問い合わせ
                </a>
              </li>
              <li style={{marginBottom: '1rem'}}>
                <a
                  href='#'
                  style={{
                    color: 'var(--color-link)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                  }}
                >
                  マイページ
                </a>
              </li>
            </ul>
          </nav>
        </Drawer>
      </>
    );
  },
  args: {
    position: 'left',
    title: 'ナビゲーションメニュー',
    isOpen: false,
    onClose: fn(),
    children: null,
  },
};

// 右からのオーバーレイ
export const RightOverlay: Story = {
  render(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div style={{padding: '2rem'}}>
          <Button onClick={() => {
 setIsOpen(true);
}}>
            ドロワーを開く（右から）
          </Button>
        </div>
        <Drawer {...args} isOpen={isOpen} onClose={() => {
 setIsOpen(false);
}}>
          <div>
            <h2 style={{marginTop: 0, fontSize: '1.5rem', fontWeight: 700}}>
              設定
            </h2>
            <div style={{marginBottom: '1.5rem'}}>
              <h3 style={{fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem'}}>
                通知設定
              </h3>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>
                <input type='checkbox' defaultChecked />
                <span style={{marginLeft: '0.5rem'}}>メール通知を受け取る</span>
              </label>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>
                <input type='checkbox' />
                <span style={{marginLeft: '0.5rem'}}>プッシュ通知を受け取る</span>
              </label>
            </div>
            <div style={{marginBottom: '1.5rem'}}>
              <h3 style={{fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem'}}>
                表示設定
              </h3>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>
                <input type='radio' name='theme' defaultChecked />
                <span style={{marginLeft: '0.5rem'}}>ライトモード</span>
              </label>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>
                <input type='radio' name='theme' />
                <span style={{marginLeft: '0.5rem'}}>ダークモード</span>
              </label>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>
                <input type='radio' name='theme' />
                <span style={{marginLeft: '0.5rem'}}>システム設定に従う</span>
              </label>
            </div>
            <Button variant='primary'>設定を保存</Button>
          </div>
        </Drawer>
      </>
    );
  },
  args: {
    position: 'right',
    title: '設定パネル',
    isOpen: false,
    onClose: fn(),
    children: null,
  },
};

// 全面オーバーレイ
export const FullOverlay: Story = {
  render(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div style={{padding: '2rem'}}>
          <Button onClick={() => {
 setIsOpen(true);
}}>
            ドロワーを開く（全面）
          </Button>
        </div>
        <Drawer {...args} isOpen={isOpen} onClose={() => {
 setIsOpen(false);
}}>
          <div>
            <h1 style={{marginTop: 0, fontSize: '2rem', fontWeight: 700}}>
              検索結果
            </h1>
            <div style={{marginBottom: '1.5rem'}}>
              <input
                type='search'
                placeholder='キーワードを入力'
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-base)',
                }}
              />
            </div>
            <div>
              <h2 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem'}}>
                検索結果（12件）
              </h2>
              {[1, 2, 3, 4, 5].map(item => (
                <div
                  key={item}
                  style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-base)',
                  }}
                >
                  <h3 style={{fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem'}}>
                    検索結果 {item}
                  </h3>
                  <p style={{color: 'var(--text-secondary)', marginBottom: '0.5rem'}}>
                    これは検索結果の説明文です。関連する情報がここに表示されます。
                  </p>
                  <a
                    href='#'
                    style={{
                      color: 'var(--color-link)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                    }}
                  >
                    詳細を見る →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </>
    );
  },
  args: {
    position: 'full',
    title: '検索',
    isOpen: false,
    onClose: fn(),
    children: null,
  },
};

// モバイルメニューの例
export const MobileMenu: Story = {
  render(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
          }}
        >
          <button
            onClick={() => {
 setIsOpen(true);
}}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            aria-label='メニューを開く'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          </button>
          <span style={{marginLeft: '1rem', fontSize: '1.25rem', fontWeight: 700}}>
            デジタル庁
          </span>
        </div>
        <div style={{padding: '2rem'}}>
          <h1 style={{fontSize: '2rem', fontWeight: 700}}>ページタイトル</h1>
          <p>ここにメインコンテンツが表示されます。</p>
        </div>
        <Drawer {...args} isOpen={isOpen} onClose={() => {
 setIsOpen(false);
}}>
          <nav>
            <div style={{marginBottom: '2rem'}}>
              <h2
                style={{
                  marginTop: 0,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                }}
              >
                デジタル庁
              </h2>
            </div>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '0.5rem'}}>
                <a
                  href='#'
                  style={{
                    display: 'block',
                    padding: '0.75rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-base)',
                  }}
                  onMouseEnter={event => {
                    event.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={event => {
                    event.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  トップページ
                </a>
              </li>
              <li style={{marginBottom: '0.5rem'}}>
                <a
                  href='#'
                  style={{
                    display: 'block',
                    padding: '0.75rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-base)',
                  }}
                  onMouseEnter={event => {
                    event.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={event => {
                    event.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  デジタル庁について
                </a>
              </li>
              <li style={{marginBottom: '0.5rem'}}>
                <a
                  href='#'
                  style={{
                    display: 'block',
                    padding: '0.75rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-base)',
                  }}
                  onMouseEnter={event => {
                    event.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={event => {
                    event.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  政策・取組
                </a>
              </li>
              <li style={{marginBottom: '0.5rem'}}>
                <a
                  href='#'
                  style={{
                    display: 'block',
                    padding: '0.75rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-base)',
                  }}
                  onMouseEnter={event => {
                    event.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={event => {
                    event.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  お知らせ
                </a>
              </li>
              <li style={{marginBottom: '0.5rem'}}>
                <a
                  href='#'
                  style={{
                    display: 'block',
                    padding: '0.75rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-base)',
                  }}
                  onMouseEnter={event => {
                    event.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={event => {
                    event.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  採用情報
                </a>
              </li>
            </ul>
          </nav>
        </Drawer>
      </>
    );
  },
  args: {
    position: 'left',
    title: 'モバイルメニュー',
    isOpen: false,
    onClose: fn(),
    children: null,
  },
};
