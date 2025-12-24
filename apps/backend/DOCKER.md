# Docker デプロイメントガイド

## 📦 構成

このプロジェクトは Docker Compose を使用して、以下のサービスをコンテナ化しています：

- **backend**: Hono API サーバー
- **db**: PostgreSQL データベース
- **pgadmin4**: データベース管理ツール

## 🏗️ Dockerfile の説明

### マルチステージビルド

Backend の Dockerfile は2段階のビルドプロセスを採用しています：

#### 1. Build Stage
- Node.js 22 Alpine をベースイメージとして使用
- pnpm を使用して依存関係をインストール
- TypeScript をコンパイル

#### 2. Production Stage
- 軽量な Node.js 22 Alpine イメージを使用
- 本番環境用の依存関係のみをインストール
- ビルドされたアプリケーションをコピー
- ヘルスチェックを設定

### 最適化のポイント

1. **マルチステージビルド**: 最終イメージサイズを削減
2. **Alpine Linux**: 軽量なベースイメージ
3. **レイヤーキャッシング**: 効率的なビルド
4. **本番依存関係のみ**: セキュリティと軽量化

## 🚀 使用方法

### 環境変数の設定

```bash
cp .env.example .env
```

`.env` ファイルを編集して環境に合わせた設定を行います：

```env
# Database
DB_NAME=fumimi_channel
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_PORT=5432

# Backend
BACKEND_PORT=3000

# PgAdmin
PGADMIN_PORT=8080
```

### サービスの起動

```bash
# すべてのサービスを起動
docker compose up -d

# 特定のサービスのみ起動
docker compose up -d backend

# ログを確認
docker compose logs -f backend
```

### サービスの停止

```bash
# 停止
docker compose down

# ボリュームも削除（データベースのデータも削除されます）
docker compose down -v
```

### 再ビルド

コードを変更した後は、イメージを再ビルドしてください：

```bash
docker compose up -d --build backend
```

## 🔍 動作確認

### API のテスト

```bash
# ヘルスチェック
curl http://localhost:3000/health

# API エンドポイント
curl http://localhost:3000/api/hello

# エコーエンドポイント
curl -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Docker!"}'
```

### データベース接続

PgAdmin を使用してデータベースに接続：

1. ブラウザで http://localhost:8080 を開く
2. デフォルト認証情報でログイン:
   - Email: `user@example.com`
   - Password: `password`

### コンテナ内でのデバッグ

```bash
# コンテナに入る
docker compose exec backend sh

# ログを確認
docker compose logs backend

# リアルタイムログ
docker compose logs -f backend
```

## 🌐 ネットワーク構成

すべてのサービスは `fumimi-network` という名前の Docker ネットワーク上で動作します。

- Backend は `db:5432` でデータベースに接続
- サービス間の通信は内部ネットワーク経由
- 外部からは指定されたポートのみアクセス可能

## 🏥 ヘルスチェック

### Database
- PostgreSQL の `pg_isready` コマンドで確認
- 10秒ごとにチェック
- 5回連続で失敗すると unhealthy

### Backend
- `/health` エンドポイントで確認
- 30秒ごとにチェック
- 起動後5秒待機してからチェック開始

## 🔧 トラブルシューティング

### コンテナが起動しない

```bash
# ログを確認
docker compose logs backend

# コンテナの状態を確認
docker compose ps
```

### データベース接続エラー

1. データベースコンテナが起動しているか確認
   ```bash
   docker compose ps db
   ```

2. 環境変数が正しく設定されているか確認
   ```bash
   docker compose config
   ```

3. ネットワーク接続を確認
   ```bash
   docker compose exec backend ping db
   ```

### ポートが既に使用されている

別のサービスがポートを使用している場合、`.env` ファイルでポートを変更：

```env
BACKEND_PORT=3001
DB_PORT=5433
```

## 📊 本番環境への展開

### セキュリティの考慮事項

1. **環境変数**: センシティブな情報を適切に管理
2. **パスワード**: デフォルトのパスワードを変更
3. **ネットワーク**: 必要なポートのみ公開
4. **更新**: 定期的にベースイメージを更新

### スケーリング

```bash
# Backend を複数起動
docker compose up -d --scale backend=3
```

ロードバランサー（nginx など）を追加することで、負荷分散が可能です。

## 🔄 CI/CD

GitHub Actions や GitLab CI などの CI/CD パイプラインでイメージをビルド・デプロイできます：

```yaml
# .github/workflows/deploy.yml の例
- name: Build Docker image
  run: docker compose build backend

- name: Push to registry
  run: docker compose push backend
```
