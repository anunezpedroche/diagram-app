import { db } from '~/server/db';
import { IUpdateDiagramCommand } from '../../domain/diagram';

export default async function updateDiagramCommand({
	updateDate,
	description,
	title,
	userId,
	snapshot,
	diagramId,
}: IUpdateDiagramCommand) {
	return await db.diagrams
		.update({
			where: { id: diagramId },
			data: {
				updateDate,
				description,
				title,
				userId,
				snapshot,
			},
		})
		.catch(() => {});
}
