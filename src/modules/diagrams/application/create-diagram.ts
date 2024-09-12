import { db } from '~/server/db';
import createDiagramCommand from './commands/create-diagram-command';

export default async function createDiagram(
	title: string,
	description: string,
	snapshot?: string,
) {
	return await createDiagramCommand({
		title: title,
		description: description,
		userId: 1,
		snapshot: snapshot ?? null,
		creationDate: new Date(),
	});
}
