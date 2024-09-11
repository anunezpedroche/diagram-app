import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import createDiagram from '~/modules/diagrams/application/create-diagram';
import updateDiagram from '~/modules/diagrams/application/update-diagram';

export const diagramsRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				title: z.string().min(3),
				description: z.string().min(15),
				snapshot: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			return await createDiagram(
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
			return await updateDiagram(
				input.title,
				input.description,
				input.snapshot,
				input.diagramId,
			);
		}),
});
