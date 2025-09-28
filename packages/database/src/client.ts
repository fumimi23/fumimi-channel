import {PrismaClient} from '@prisma/client';

export function createPrismaClient() {
	const prismaClient = new PrismaClient();
	return prismaClient;
}
