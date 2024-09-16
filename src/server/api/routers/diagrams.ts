import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { decrypt } from '~/lib/token-management';
import { Session } from '~/modules/users/domain/session';
import { cookies } from 'next/headers';

export const diagramsRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				title: z.string().min(3),
				description: z.string().min(15),
				snapshot: z.string().nullable(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.diagramApiRepository.createDiagram(
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
		.mutation(async ({ input, ctx }) => {
			return await ctx.diagramApiRepository.updateDiagram(
				input.title,
				input.description,
				input.snapshot,
				input.diagramId,
			);
		}),
	getAllByUser: publicProcedure.query(async ({ ctx }) => {
		return await ctx.diagramApiRepository.getDiagramsByUserId();
	}),
	getById: publicProcedure
		.input(z.object({ id: z.number(), userId: z.number() }))
		.query(async ({ input, ctx }) => {
			return await ctx.diagramApiRepository.getDiagramById(
				input.id,
				input.userId,
			);
		}),
	deleteById: publicProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			return await ctx.diagramApiRepository.deleteDiagram(input.id);
		}),
});
