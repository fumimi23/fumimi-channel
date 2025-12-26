import {PrismaClient} from '@prisma/client';

export function createPrismaClient(): PrismaClient {
	const prismaClient = new PrismaClient();
	return prismaClient;
}
