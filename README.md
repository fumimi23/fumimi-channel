# fumimi-channel

Like 2ch

## 📋 プロジェクト構成

モノレポ構成のプロジェクトです。

```
fumimi-channel/
├── apps/
│   └── backend/          # Hono API サーバー
├── packages/
│   ├── database/         # Prisma スキーマ・クライアント
│   └── ui/               # UIコンポーネントライブラリ
└── compose.yaml          # Docker Compose 設定
```

## 🚀 セットアップ

### 前提条件

- Node.js 22+
- pnpm 10+
- Docker & Docker Compose

### 1. リポジトリのクローン

```bash
git clone https://github.com/fumimi23/fumimi-channel.git
cd fumimi-channel
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 環境変数の設定

```bash
cp .env.example .env
```

必要に応じて `.env` ファイルを編集してください。

## 🐳 Docker での起動

### すべてのサービスを起動

```bash
docker compose up -d
```

これにより以下のサービスが起動します：

- **PostgreSQL** (ポート: 5432)
- **Backend API** (ポート: 3000)
- **PgAdmin** (ポート: 8080)

### サービスの確認

```bash
# すべてのコンテナを確認
docker compose ps

# ログを確認
docker compose logs -f backend

# API の動作確認
curl http://localhost:3000/health
```

### サービスの停止

```bash
# 停止
docker compose down

# ボリュームも削除して完全にクリーンアップ
docker compose down -v
```

### Backend のみを再ビルド

```bash
docker compose up -d --build backend
```

## 💻 ローカル開発

### Backend API の開発

```bash
cd apps/backend
pnpm dev
```

サーバーは http://localhost:3000 で起動します。

### UI の開発

```bash
cd packages/ui
pnpm storybook
```

Storybook が起動します。

## 📚 API エンドポイント

- `GET /` - サーバー情報
- `GET /health` - ヘルスチェック
- `GET /health/ready` - レディネスチェック
- `GET /health/live` - ライブネスチェック
- `GET /api/hello` - Hello World
- `POST /api/echo` - メッセージのエコー

## 🛠️ 技術スタック

### Backend
- [Hono](https://hono.dev/) - Web フレームワーク
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - データベース
- [Zod](https://zod.dev/) - バリデーション

### Frontend
- [React](https://react.dev/) - UI ライブラリ
- [Storybook](https://storybook.js.org/) - コンポーネントカタログ

### Tools
- [pnpm](https://pnpm.io/) - パッケージマネージャー
- [Docker](https://www.docker.com/) - コンテナ化
- [TypeScript](https://www.typescriptlang.org/) - 型安全性

## 📝 スクリプト

```bash
# Lint
pnpm lint

# Format
pnpm format
```

