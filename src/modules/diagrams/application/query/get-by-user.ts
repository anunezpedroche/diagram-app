import { db } from '~/server/db';
import { Diagram } from '../../domain/diagram';
import { ApiResponse } from '~/modules/core/domain/api-response';

export default async function getDiagramsByUserIdQuery(
	userId: number,
): Promise<ApiResponse<Diagram[] | null>> {
	return await db.diagrams
		.findMany({ where: { userId: userId } })
		.catch(_err => {
			return {
				success: false,
				data: _err,
				message: 'Error getting diagrams',
			};
		})
		.then(value => {
			return value
				? {
						success: true,
						data: value as Diagram[],
						message: 'Success!',
					}
				: { success: false, data: null, message: 'Error getting diagrams' };
		});
}
