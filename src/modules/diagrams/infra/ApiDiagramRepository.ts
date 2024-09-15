import { decrypt } from '~/lib/token-management';
import createDiagramCommand from '../application/commands/create-diagram-command';
import updateDiagramCommand from '../application/commands/update-diagram-command';
import getDiagramsByIdQuery from '../application/query/get-by-id-query';
import getDiagramsByUserIdQuery from '../application/query/get-by-user';
import { Session } from '~/modules/users/domain/session';
import { cookies } from 'next/headers';
import deleteDiagramCommand from '../application/commands/delete-diagram-command';

export function createApiDiagramRepository() {
	async function getDiagramById(diagramId: number) {
		return getDiagramsByIdQuery(diagramId);
	}

	async function getDiagramsByUserId() {
		const user = await decrypt<Session>(cookies().get('session')?.value ?? '');
		if (!user) return { success: false, data: null, message: 'Unauthorized' };
		return getDiagramsByUserIdQuery(user.userId);
	}

	async function createDiagram(
		title: string,
		description: string,
		snapshot: string | null,
	) {
		const user = await decrypt<Session>(cookies().get('session')?.value ?? '');
		if (!user) return { success: false, data: null, message: 'Unauthorized' };
		return await createDiagramCommand({
			title: title,
			description: description,
			userId: user.userId,
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
		const user = await decrypt<Session>(cookies().get('session')?.value ?? '');
		if (!user) return { success: false, data: null, message: 'Unauthorized' };
		return await updateDiagramCommand({
			title: title,
			description: description,
			userId: user.userId,
			snapshot: snapshot,
			updateDate: new Date(),
			diagramId: diagramId,
		});
	}

	async function deleteDiagram(diagramId: number) {
		return await deleteDiagramCommand(diagramId);
	}

	return {
		updateDiagram,
		createDiagram,
		getDiagramsByUserId,
		getDiagramById,
		deleteDiagram,
	};
}
