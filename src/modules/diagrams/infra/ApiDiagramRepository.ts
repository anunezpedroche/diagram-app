import createDiagramCommand from '../application/commands/create-diagram-command';
import updateDiagramCommand from '../application/commands/update-diagram-command';
import { Diagram } from '../domain/diagram';

export function createApiDiagramRepository() {
	const cache = new Map<number, Diagram>();

	async function getDiagramById(diagramId: number) {
		if (cache.has(diagramId)) {
			return cache.get(diagramId) as Diagram;
		}
	}

	async function createDiagram(
		title: string,
		description: string,
		snapshot?: string,
	) {
		const newDiagram = await createDiagramCommand({
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
		getDiagramById,
	};
}
