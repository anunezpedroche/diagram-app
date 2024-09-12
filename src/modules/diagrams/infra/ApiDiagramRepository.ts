import createDiagramCommand from '../application/commands/create-diagram-command';
import updateDiagramCommand from '../application/commands/update-diagram-command';
import getDiagramsByIdQuery from '../application/query/get-by-id-query';
import getDiagramsByUserIdQuery from '../application/query/get-by-user';
import { Diagram } from '../domain/diagram';

export function createApiDiagramRepository() {
	const cache = new Map<number, Diagram>();

	async function getDiagramById(diagramId: number) {
		if (cache.has(diagramId)) {
			return cache.get(diagramId) as Diagram;
		}

		return getDiagramsByIdQuery(diagramId);
	}

	async function getDiagramsByUserId(userId: number) {
		return getDiagramsByUserIdQuery(userId);
	}

	async function createDiagram(
		title: string,
		description: string,
		snapshot: string | null,
	) {
		return await createDiagramCommand({
			title: title,
			description: description,
			userId: 1,
			snapshot: snapshot ?? null,
			creationDate: new Date(),
		});
	}

	async function updateDiagram(
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

	return {
		updateDiagram,
		createDiagram,
		getDiagramsByUserId,
		getDiagramById,
	};
}
