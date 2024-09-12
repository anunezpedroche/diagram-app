import { db } from '~/server/db';

export default async function getDiagramsByUserIdQuery(userId: number) {
	return await db.diagrams.findMany({ where: { userId: userId } });
}
