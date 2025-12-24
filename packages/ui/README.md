# @repo/ui

アトミックデザインに基づいたUIコンポーネントライブラリ

## 📁 フォルダ構成

このパッケージはアトミックデザインの原則に従って構成されています：

```
src/
├── components/
│   ├── atoms/           # 最小単位のコンポーネント（Button, Input など）
│   ├── molecules/       # atomsを組み合わせたコンポーネント（FormField など）
│   ├── organisms/       # moleculesを組み合わせた複雑なコンポーネント
│   └── templates/       # ページレイアウトのテンプレート
├── styles/
│   ├── variables.css    # CSS変数の定義
│   └── global.css       # グローバルスタイル
└── types/
    └── css-modules.d.ts # CSS Modulesの型定義
```

## 🚀 セットアップ

### 依存関係のインストール

```bash
pnpm install
```

## 📚 Storybook

コンポーネントカタログはStorybookで管理されています。

### Storybookの起動

```bash
pnpm storybook
```

ブラウザで `http://localhost:6006` を開いてコンポーネントカタログを確認できます。

### Storybookのビルド

```bash
pnpm build-storybook
```

## 🧩 コンポーネントの追加

### Atomsの追加

1. `src/components/atoms/YourComponent/` ディレクトリを作成
2. 以下のファイルを作成：
   - `YourComponent.tsx` - コンポーネント本体
   - `YourComponent.module.css` - スタイル
   - `YourComponent.stories.tsx` - Storybook用のストーリー
   - `index.ts` - エクスポート

### Moleculesの追加

1. `src/components/molecules/YourComponent/` ディレクトリを作成
2. Atoms同様にファイルを作成
3. Atomsのコンポーネントを組み合わせて実装

### Organismsの追加

1. `src/components/organisms/YourComponent/` ディレクトリを作成
2. MoleculesやAtomsを組み合わせて複雑なコンポーネントを実装

### Templatesの追加

1. `src/components/templates/YourTemplate/` ディレクトリを作成
2. ページレイアウトのテンプレートを実装

## 🎨 デザインシステム

このUIライブラリは **[デジタル庁デザインシステム](https://design.digital.go.jp/dads/foundations/color/)** を参考にしています。

### カラーシステムの特徴

- **アクセシビリティ重視**: WCAG 2.1 AAレベルのコントラスト比（4.5:1以上）を確保
- **ダークモード対応**: システム設定の自動検出と手動切り替えをサポート
- **セマンティックカラー**: Success（成功）、Warning（警告）、Error（エラー）など意味を持つ色
- **階調システム**: 各色に50-900の段階的な明度を持つカラーパレット
- **一貫性のある命名**: `--color-{category}-{level}` の形式で統一

### 主要なカラーカテゴリ

```css
/* プライマリーカラー（ブランドカラー） */
--color-primary: #1976d2;
--color-primary-hover: #0d47a1;

/* セマンティックカラー */
--color-success: #2e7d32;  /* 成功・完了 */
--color-warning: #f57c00;  /* 警告・注意 */
--color-error: #c62828;    /* エラー・危険 */
--color-info: #0288d1;     /* 情報 */

/* ニュートラルカラー */
--color-gray-{50-900};     /* グレースケール */
```

## 🎨 スタイリング

### CSS Modules

各コンポーネントは CSS Modules を使用してスタイリングします：

```tsx
import styles from './YourComponent.module.css';

export const YourComponent = () => {
  return <div className={styles.container}>...</div>;
};
```

### CSS変数

`src/styles/variables.css` で定義されているCSS変数を使用できます：

```css
.button {
  color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}

/* セマンティックカラーの使用例 */
.successMessage {
  color: var(--color-success);
  background-color: var(--color-success-50);
  border: 1px solid var(--color-success-200);
}
```

### ダークモード対応

#### 自動検出（デフォルト）

システムの `prefers-color-scheme` 設定を自動的に検出：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-primary: #1a1a1a;
    --text-primary: #f1f3f5;
    /* ... */
  }
}
```

#### 手動切り替え

`ThemeToggle` コンポーネントまたは `data-theme` 属性で切り替え：

```tsx
import { ThemeToggle } from '@repo/ui';

function App() {
  return <ThemeToggle defaultTheme="system" />;
}
```

```javascript
// 手動でテーマを設定
document.documentElement.setAttribute('data-theme', 'dark');
```

#### セマンティックトークン

テーマに依存しないセマンティックトークンを使用：

```css
/* ❌ 固定値を直接使用しない */
.card {
  background-color: #ffffff;
  color: #000000;
}

/* ✅ セマンティックトークンを使用 */
.card {
  background-color: var(--surface-default);
  color: var(--text-primary);
}
```

利用可能なトークン：
- **Background**: `--background-primary`, `--background-secondary`, `--background-tertiary`
- **Text**: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-disabled`
- **Surface**: `--surface-default`, `--surface-hover`, `--surface-active`
- **Border**: `--border-default`, `--border-strong`, `--border-subtle`

### アクセシビリティガイドライン

- テキストと背景のコントラスト比は **4.5:1以上**
- UI要素（ボタン、アイコンなど）は **3:1以上**
- 色だけでなく、アイコンやテキストで情報を伝達
- フォーカス状態を明確に表示
- ダークモードでもコントラスト比を維持

## 📝 型チェック

```bash
pnpm type-check
```

## 🔧 技術スタック

- **React** - UIライブラリ
- **TypeScript** - 型安全性
- **CSS Modules** - スコープ化されたスタイリング
- **Storybook** - コンポーネントカタログ
- **Vite** - ビルドツール

## 📖 使用方法

他のパッケージからコンポーネントをインポート：

```tsx
import { Button, Input, FormField } from '@repo/ui';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <FormField 
        label="Email" 
        inputProps={{ type: 'email', placeholder: 'Enter email' }}
      />
    </div>
  );
}
```

## 🤝 コントリビューション

新しいコンポーネントを追加する際は：

1. アトミックデザインの原則に従う
2. TypeScriptで型を定義する
3. CSS Modulesでスタイリングする
4. Storybookのストーリーを作成する
5. propsの説明をJSDocで記述する
