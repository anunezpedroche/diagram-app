import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { createApiDiagramRepository } from '~/modules/diagrams/infra/ApiDiagramRepository';

const diagramApiRepository = createApiDiagramRepository();

export const diagramsRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				title: z.string().min(3),
				description: z.string().min(15),
				snapshot: z.string().nullable(),
			}),
		)
		.mutation(async ({ input }) => {
			return await diagramApiRepository.createDiagram(
				input.title,
				input.description,
				input.snapshot,
			);
		}),
	update: publicProcedure
		.input(
			z.object({
				diagramId: z.number(),
				title: z.string().min(3),
				description: z.string().min(15),
				snapshot: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			return await diagramApiRepository.updateDiagram(
				input.title,
				input.description,
				input.snapshot,
				input.diagramId,
			);
		}),
	getAllByUser: publicProcedure
		.input(z.object({ userId: z.number() }))
		.query(async ({ input }) => {
			return await diagramApiRepository.getDiagramsByUserId(input.userId);
		}),
	getById: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			return await diagramApiRepository.getDiagramById(input.id);
		}),
});
