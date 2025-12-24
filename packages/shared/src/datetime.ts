import dayjs, {type Dayjs, type ConfigType} from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import jaLocale from 'dayjs/locale/ja.js';

// プラグインの読み込み
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

// デフォルトロケールを日本に設定
dayjs.locale(jaLocale);

/**
 * 日時オブジェクトを作成
 */
export function createDate(date?: ConfigType): Dayjs {
	return dayjs(date);
}

/**
 * 現在の日時を取得
 */
export function getNow(): Dayjs {
	return dayjs();
}

/**
 * 日時をフォーマット
 */
export function formatDate(date: ConfigType, format = 'YYYY-MM-DD HH:mm:ss'): string {
	return dayjs(date).format(format);
}

/**
 * ISO 8601形式で日時を取得
 */
export function toIsoString(date: ConfigType): string {
	return dayjs(date).toISOString();
}

/**
 * Unixタイムスタンプ（秒）を取得
 */
export function toUnix(date: ConfigType): number {
	return dayjs(date).unix();
}

/**
 * 相対時間を取得（例: "3日前"）
 */
export function fromNow(date: ConfigType): string {
	return dayjs(date).fromNow();
}

/**
 * 日時の加算
 */
export function addTime(date: ConfigType, amount: number, unit: dayjs.ManipulateType): Dayjs {
	return dayjs(date).add(amount, unit);
}

/**
 * 日時の減算
 */
export function subtractTime(date: ConfigType, amount: number, unit: dayjs.ManipulateType): Dayjs {
	return dayjs(date).subtract(amount, unit);
}

/**
 * 日時の比較（date1がdate2より前かどうか）
 */
export function isBefore(date1: ConfigType, date2: ConfigType): boolean {
	return dayjs(date1).isBefore(dayjs(date2));
}

/**
 * 日時の比較（date1がdate2より後かどうか）
 */
export function isAfter(date1: ConfigType, date2: ConfigType): boolean {
	return dayjs(date1).isAfter(dayjs(date2));
}

/**
 * 日時の比較（date1とdate2が同じかどうか）
 */
export function isSame(date1: ConfigType, date2: ConfigType, unit?: dayjs.OpUnitType): boolean {
	return dayjs(date1).isSame(dayjs(date2), unit);
}

/**
 * UTC日時を取得
 */
export function utcDate(date?: ConfigType): Dayjs {
	return dayjs(date).utc();
}

/**
 * タイムゾーン付き日時を取得
 */
export function tzDate(date: ConfigType, timezone: string): Dayjs {
	return dayjs(date).tz(timezone);
}

// Dayjsをそのままエクスポート（高度な使用向け）

export {default as dayjs, type Dayjs, type ConfigType} from 'dayjs';
