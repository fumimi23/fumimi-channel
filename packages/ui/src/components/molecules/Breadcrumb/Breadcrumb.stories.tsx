import type {Meta, StoryObj} from '@storybook/react';
import {Breadcrumb} from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# パンくずリスト

デジタル庁デザインシステム準拠のパンくずリストコンポーネントです。

## 使い方

### 配置と仕様

パンくずリストはヘッダーとページ見出しの間に配置されます。パンくずリストの長さは、当該ページのサイト構造上の階層の深さや、ページ見出しの文字長に依存し制御できないため、コンテンツエリア幅より広くなることを考慮して、改行する仕様を前提とします。

### デスクトップ

パンくずリストがコンテンツ幅よりも長い場合は改行されます。

### モバイル

モバイルの場合は、デスクトップと同様に改行する仕様を使うか、または改行無しの横スクロールが可能な仕様を併用するかのどちらかで実装します。

#### 改行での仕様

改行仕様の場合はページ上部、またはページ下部にパンくずリストを配置します。

#### 横スクロールでの仕様

多くのページで長いパンくずリストが想定される場合、パンくずリストによってコンテンツを押し下げられることを防ぐため、改行無しの横スクロールによって閲覧できる仕様で実装します。ただし、横スクロールの仕様で実装した場合はページ下部、フッターエリアの上部に改行仕様のパンくずリストを配置するようにして下さい。

## アクセシビリティ

- \`<nav>\` 要素と \`aria-label\` を使用してナビゲーションを明示
- 現在のページには \`aria-current="page"\` を設定
- キーボードナビゲーションに対応

## 参考

- [デジタル庁デザインシステム - パンくずリスト](https://design.digital.go.jp/dads/components/breadcrumb/)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mobileDisplay: {
      control: 'select',
      options: ['wrap', 'scroll'],
      description: 'モバイルでの表示方式（改行 or 横スクロール）',
    },
    ariaLabel: {
      control: 'text',
      description: 'ナビゲーションのaria-label',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例（短いパンくずリスト）
export const Basic: Story = {
  args: {
    items: [
      {label: 'ホーム', href: '/'},
      {label: 'サービス', href: '/services'},
      {label: '現在のページ'},
    ],
    mobileDisplay: 'wrap',
  },
};

// 長いパンくずリスト（改行仕様）
export const LongWithWrap: Story = {
  args: {
    items: [
      {label: 'ホーム', href: '/'},
      {label: 'デジタル庁について', href: '/about'},
      {label: '政策・取組', href: '/about/policies'},
      {label: 'デジタル社会の実現に向けた取組', href: '/about/policies/digital-society'},
      {label: 'マイナンバーカードの利活用促進', href: '/about/policies/digital-society/mynumber'},
      {label: '現在のページ：マイナンバーカードの申請方法について'},
    ],
    mobileDisplay: 'wrap',
  },
};

// 長いパンくずリスト（横スクロール仕様）
export const LongWithScroll: Story = {
  args: {
    items: [
      {label: 'ホーム', href: '/'},
      {label: 'デジタル庁について', href: '/about'},
      {label: '政策・取組', href: '/about/policies'},
      {label: 'デジタル社会の実現に向けた取組', href: '/about/policies/digital-society'},
      {label: 'マイナンバーカードの利活用促進', href: '/about/policies/digital-society/mynumber'},
      {label: '現在のページ：マイナンバーカードの申請方法について'},
    ],
    mobileDisplay: 'scroll',
  },
  parameters: {
    docs: {
      description: {
        story: 'モバイルで横スクロール可能な仕様。画面幅を狭めて確認してください。',
      },
    },
  },
};

// 3階層のパンくずリスト
export const ThreeLevels: Story = {
  args: {
    items: [
      {label: 'トップページ', href: '/'},
      {label: '行政サービス', href: '/services'},
      {label: '申請・届出'},
    ],
    mobileDisplay: 'wrap',
  },
};

// 深い階層のパンくずリスト
export const DeepHierarchy: Story = {
  args: {
    items: [
      {label: 'ホーム', href: '/'},
      {label: 'カテゴリ1', href: '/category1'},
      {label: 'カテゴリ2', href: '/category1/category2'},
      {label: 'カテゴリ3', href: '/category1/category2/category3'},
      {label: 'カテゴリ4', href: '/category1/category2/category3/category4'},
      {label: 'カテゴリ5', href: '/category1/category2/category3/category4/category5'},
      {label: '現在のページ'},
    ],
    mobileDisplay: 'wrap',
  },
};

// 日本語の長い名前を含むパンくずリスト
export const LongJapaneseLabels: Story = {
  args: {
    items: [
      {label: 'デジタル庁トップページ', href: '/'},
      {label: 'デジタル社会形成の司令塔として', href: '/about'},
      {label: '国民目線のデジタル化を推進します', href: '/about/mission'},
      {label: '誰一人取り残されないデジタル社会の実現'},
    ],
    mobileDisplay: 'wrap',
  },
};

// 実際の使用例：ページレイアウト内での配置
export const InPageLayout: Story = {
  render: args => (
    <div>
      {/* ヘッダー（模擬） */}
      <header
        style={{
          padding: '1rem',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          marginBottom: '0',
        }}
      >
        <h1 style={{margin: 0, fontSize: '1.25rem'}}>デジタル庁</h1>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb {...args} />

      {/* ページ見出し */}
      <main style={{padding: '0 1rem'}}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginTop: 'var(--spacing-4)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          ページタイトル
        </h1>
        <p>ここにページのコンテンツが表示されます。</p>
        <p>
          パンくずリストはヘッダーとページ見出しの間に配置されています。
        </p>
      </main>
    </div>
  ),
  args: {
    items: [
      {label: 'ホーム', href: '/'},
      {label: 'サービス一覧', href: '/services'},
      {label: 'オンライン申請', href: '/services/online'},
      {label: '現在のページ'},
    ],
    mobileDisplay: 'wrap',
  },
};

// 横スクロール仕様での使用例（上部・下部配置）
export const ScrollWithTopAndBottom: Story = {
  render: args => (
    <div>
      {/* ヘッダー（模擬） */}
      <header
        style={{
          padding: '1rem',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          marginBottom: '0',
        }}
      >
        <h1 style={{margin: 0, fontSize: '1.25rem'}}>デジタル庁</h1>
      </header>

      {/* 上部：横スクロール仕様のパンくずリスト */}
      <Breadcrumb
        items={args.items}
        mobileDisplay='scroll'
        ariaLabel='パンくずリスト（上部）'
      />

      {/* ページ見出し */}
      <main style={{padding: '0 1rem'}}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginTop: 'var(--spacing-4)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          長いページタイトルの例
        </h1>
        <p>
          上部のパンくずリストは横スクロール仕様です（モバイル時）。
        </p>
        <p>
          コンテンツが長い場合でも、パンくずリストによってコンテンツが押し下げられることを防ぎます。
        </p>
        <div style={{
 height: '200px', backgroundColor: 'var(--background-secondary)', padding: '1rem', marginTop: '1rem',
}}>
          <p>コンテンツエリア</p>
        </div>
      </main>

      {/* 下部：改行仕様のパンくずリスト */}
      <div style={{
 padding: '0 1rem', marginTop: 'var(--spacing-8)', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--spacing-4)',
}}>
        <Breadcrumb
          items={args.items}
          mobileDisplay='wrap'
          ariaLabel='パンくずリスト（下部）'
        />
      </div>

      {/* フッター（模擬） */}
      <footer
        style={{
          padding: '2rem 1rem',
          backgroundColor: 'var(--background-secondary)',
          marginTop: 'var(--spacing-8)',
          borderTop: '1px solid var(--border-default)',
        }}
      >
        <p style={{margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)'}}>
          © Digital Agency
        </p>
      </footer>
    </div>
  ),
  args: {
    items: [
      {label: 'ホーム', href: '/'},
      {label: 'デジタル庁について', href: '/about'},
      {label: '政策・取組', href: '/about/policies'},
      {label: 'デジタル社会の実現に向けた取組', href: '/about/policies/digital-society'},
      {label: 'マイナンバーカードの利活用促進'},
    ],
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '横スクロール仕様を使用する場合、ページ上部に横スクロール、ページ下部（フッター上部）に改行仕様のパンくずリストを配置します。画面幅を狭めて確認してください。',
      },
    },
  },
};

// 2階層のシンプルなパンくずリスト
export const TwoLevels: Story = {
  args: {
    items: [
      {label: 'ホーム', href: '/'},
      {label: '現在のページ'},
    ],
    mobileDisplay: 'wrap',
  },
};
