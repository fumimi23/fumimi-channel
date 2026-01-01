import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
import pg from 'pg';

export function createPrismaClient(): PrismaClient {
	// Prisma 7では、アダプターまたはAccelerateを使用
	const pool = new pg.Pool({connectionString: process.env.DATABASE_URL});
	const adapter = new PrismaPg(pool);

	const prismaClient = new PrismaClient({adapter});
	return prismaClient;
}
