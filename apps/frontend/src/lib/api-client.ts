import {hc} from 'hono/client';
import type {AppType} from '@app/backend';

export const apiClient = hc<AppType>('/');
