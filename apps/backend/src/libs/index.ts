import {createHash} from 'node:crypto';

/**
 * IPアドレスと日付から9桁の投稿者IDを生成
 * 同じIPアドレスでも日付が変われば異なるIDになる
 */
export function generatePosterId(ipAddress: string, createdAt: Date): string {
  // 日付部分（YYYY-MM-DD）を取得
  const dateString = createdAt.toISOString().split('T')[0];
  // IPアドレス + 日付でハッシュ化
  const hash = createHash('sha256').update(`${ipAddress}-${dateString}`).digest('hex');
  // 最初の9文字を取得して大文字に変換
  return hash.slice(0, 9).toUpperCase();
}
