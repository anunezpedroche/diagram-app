import { db } from '~/server/db';

export default async function getDiagramsByIdQuery(id: number) {
	return await db.diagrams.findUnique({ where: { id: id } });
}
