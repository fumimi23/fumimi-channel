# Backend API Server

Hono を使用した Fumimi Channel の API サーバーです。

## セットアップ

### 1. 依存関係のインストール

プロジェクトルートから実行:

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env` を作成:

```bash
cp .env.example .env
```

必要に応じて環境変数を編集してください。

### 3. 開発サーバーの起動

```bash
pnpm dev
```

サーバーは http://localhost:3000 で起動します。

## スクリプト

- `pnpm dev` - 開発サーバーを起動（ホットリロード有効）
- `pnpm build` - TypeScript をコンパイル
- `pnpm start` - ビルドされたサーバーを起動
- `pnpm type-check` - 型チェックのみ実行

## API エンドポイント

### ヘルスチェック

- `GET /health` - サーバーの状態確認
- `GET /health/ready` - レディネスチェック
- `GET /health/live` - ライブネスチェック

### API

- `GET /api/hello` - Hello World
- `POST /api/echo` - メッセージのエコー
- `GET /api/users` - ユーザー一覧（未実装）

## 技術スタック

- [Hono](https://hono.dev/) - 軽量高速な Web フレームワーク
- [Zod](https://zod.dev/) - TypeScript ファーストのバリデーション
- [tsx](https://github.com/esbuild-kit/tsx) - TypeScript の実行環境

## ディレクトリ構造

```
apps/backend/
├── src/
│   ├── index.ts          # メインエントリーポイント
│   └── routes/           # API ルート
│       ├── health.ts     # ヘルスチェック
│       └── api.ts        # API エンドポイント
├── dist/                 # ビルド出力
├── package.json
├── tsconfig.json
└── .env.example
```
