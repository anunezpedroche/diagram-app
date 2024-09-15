import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const usersRouter = createTRPCRouter({
	createSession: publicProcedure
		.input(
			z.object({
				expiresAt: z.date(),
				userId: z.number(),
				payload: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.userApiRepository.createUserSession({
				expiresAt: input.expiresAt,
				userId: input.userId,
				payload: input.payload,
			});
		}),
	login: publicProcedure
		.input(
			z.object({
				username: z.string(),
				password: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.userApiRepository.login(input.username, input.password);
		}),
	signup: publicProcedure
		.input(
			z.object({
				username: z.string().min(4),
				password: z.string().min(6),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.userApiRepository.createUser(
				input.username,
				input.password,
			);
		}),
});
