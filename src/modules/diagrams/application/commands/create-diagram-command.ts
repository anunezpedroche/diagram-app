import { db } from '~/server/db';
import { ICreateDiagramCommand } from '../../domain/diagram';

export default async function createDiagramCommand({
	creationDate,
	description,
	title,
	userId,
	snapshot,
}: ICreateDiagramCommand) {
	return await db.diagrams
		.create({
			data: {
				creationDate,
				description,
				title,
				userId,
				snapshot,
			},
		})
		.catch(() => {});
}
