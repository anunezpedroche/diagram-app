import { db } from '~/server/db';
import { Diagram, IUpdateDiagramCommand } from '../../domain/diagram';
import { ApiResponse } from '~/modules/core/domain/api-response';

export default async function updateDiagramCommand({
	updateDate,
	description,
	title,
	userId,
	snapshot,
	diagramId,
}: IUpdateDiagramCommand): Promise<ApiResponse<Diagram | null>> {
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
		.catch(_err => {
			return {
				success: false,
				data: _err,
				message: 'Error updating diagram',
			};
		})
		.then(value => {
			return value
				? {
						success: true,
						data: { ...(value as Diagram) },
						message: 'Success!',
					}
				: { success: false, data: null, message: 'Error updating diagram' };
		});
}
