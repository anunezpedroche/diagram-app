import { db } from '~/server/db';
import { Diagram, ICreateDiagramCommand } from '../../domain/diagram';
import { ApiResponse } from '~/modules/core/domain/api-response';

export default async function createDiagramCommand({
	creationDate,
	description,
	title,
	userId,
	snapshot,
}: ICreateDiagramCommand): Promise<ApiResponse<Diagram | null>> {
	return await db.diagrams
		.create({
			data: {
				creationDate,
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
				message: 'Error creating diagram',
			};
		})
		.then(value => {
			return value
				? {
						success: true,
						data: { ...(value as Diagram) },
						message: 'Success!',
					}
				: { success: false, data: null, message: 'Error creating diagram' };
		});
}
