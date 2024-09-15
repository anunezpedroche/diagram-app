import { db } from '~/server/db';
import { Diagram } from '../../domain/diagram';
import { ApiResponse } from '~/modules/core/domain/api-response';

export default async function getDiagramsByIdQuery(
	id: number,
): Promise<ApiResponse<Diagram | null>> {
	return await db.diagrams
		.findUnique({ where: { id: id } })
		.catch(_err => {
			return {
				success: false,
				data: _err,
				message: 'Error getting diagram',
			};
		})
		.then(value => {
			return value
				? {
						success: true,
						data: { ...(value as Diagram) },
						message: 'Success!',
					}
				: { success: false, data: null, message: 'Error getting diagram' };
		});
}
