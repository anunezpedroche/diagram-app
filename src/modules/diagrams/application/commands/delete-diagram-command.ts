import { db } from '~/server/db';
import { ApiResponse } from '~/modules/core/domain/api-response';

export default async function deleteDiagramCommand(
	diagramId: number,
): Promise<ApiResponse<boolean>> {
	return await db.diagrams
		.delete({ where: { id: diagramId } })
		.catch(_err => {
			return {
				success: false,
				data: false,
				message: 'Error deleting diagram',
			};
		})
		.then(value => {
			return value
				? {
						success: true,
						data: true,
						message: 'Success!',
					}
				: { success: false, data: false, message: 'Error deleting diagram' };
		});
}
