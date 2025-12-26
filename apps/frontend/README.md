# Frontend Application

Vite + React + TypeScript フロントエンドアプリケーション

## 開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm --filter @app/frontend dev

# 型チェック
pnpm --filter @app/frontend type-check

# ビルド
pnpm --filter @app/frontend build

# プレビュー
pnpm --filter @app/frontend preview
```

## Docker

```bash
# イメージのビルド
docker build -f apps/frontend/Dockerfile -t fumimi-frontend .

# コンテナの起動
docker run -p 8080:80 fumimi-frontend
```

## 機能

- Vite による高速な開発体験
- React 18 + TypeScript
- @repo/ui コンポーネントライブラリの使用
- Nginx による本番環境での静的ファイル配信
- SPA ルーティング対応
