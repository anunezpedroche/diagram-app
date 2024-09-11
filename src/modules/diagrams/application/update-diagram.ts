import { db } from '~/server/db';
import createDiagramCommand from './commands/create-diagram-command';
import updateDiagramCommand from './commands/update-diagram-command';

export default async function updateDiagram(
	title: string,
	description: string,
	snapshot: string,
	diagramId: number,
) {
	const updateDiagram = await updateDiagramCommand({
		title: title,
		description: description,
		userId: 1,
		snapshot: snapshot,
		updateDate: new Date(),
		diagramId: diagramId,
	});
}
