import {describe, expect, it} from 'vitest';
import {generatePosterId} from './index.js';

describe('generatePosterId', () => {
	it('同じIPアドレスと同じ日付で同じIDを生成する', () => {
		const ipAddress = '192.168.1.1';
		const date = new Date('2026-01-12T10:00:00Z');

		const id1 = generatePosterId(ipAddress, date);
		const id2 = generatePosterId(ipAddress, date);

		expect(id1).toBe(id2);
	});

	it('同じIPアドレスでも日付が異なれば異なるIDを生成する', () => {
		const ipAddress = '192.168.1.1';
		const date1 = new Date('2026-01-12T10:00:00Z');
		const date2 = new Date('2026-01-13T10:00:00Z');

		const id1 = generatePosterId(ipAddress, date1);
		const id2 = generatePosterId(ipAddress, date2);

		expect(id1).not.toBe(id2);
	});

	it('異なるIPアドレスでは異なるIDを生成する', () => {
		const date = new Date('2026-01-12T10:00:00Z');
		const ip1 = '192.168.1.1';
		const ip2 = '192.168.1.2';

		const id1 = generatePosterId(ip1, date);
		const id2 = generatePosterId(ip2, date);

		expect(id1).not.toBe(id2);
	});

	it('生成されるIDは9文字である', () => {
		const ipAddress = '192.168.1.1';
		const date = new Date('2026-01-12T10:00:00Z');

		const id = generatePosterId(ipAddress, date);

		expect(id).toHaveLength(9);
	});

	it('生成されるIDはすべて大文字である', () => {
		const ipAddress = '192.168.1.1';
		const date = new Date('2026-01-12T10:00:00Z');

		const id = generatePosterId(ipAddress, date);

		expect(id).toBe(id.toUpperCase());
		expect(id).toMatch(/^[\dA-F]{9}$/);
	});

	it('同じ日付の異なる時刻でも同じIDを生成する', () => {
		const ipAddress = '192.168.1.1';
		const date1 = new Date('2026-01-12T10:00:00Z');
		const date2 = new Date('2026-01-12T23:59:59Z');

		const id1 = generatePosterId(ipAddress, date1);
		const id2 = generatePosterId(ipAddress, date2);

		expect(id1).toBe(id2);
	});
});
