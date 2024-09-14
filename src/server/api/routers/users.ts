import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { createApiUserRepository } from '~/modules/users/infra/ApiUserRepository';

const userApiRepository = createApiUserRepository();

export const usersRouter = createTRPCRouter({
	createSession: publicProcedure
		.input(
			z.object({
				expiresAt: z.date(),
				userId: z.number(),
				payload: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			return await userApiRepository.createUserSession({
				expiresAt: input.expiresAt,
				userId: input.userId,
				payload: input.payload,
			});
		}),
	potatoe: publicProcedure.query(async () => {
		console.log('llego aquí');
		return null;
	}),
	login: publicProcedure
		.input(
			z.object({
				username: z.string(),
				password: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			return await userApiRepository.login(input.username, input.password);
		}),
	signup: publicProcedure
		.input(
			z.object({
				username: z.string().min(4),
				password: z.string().min(6),
			}),
		)
		.mutation(async ({ input }) => {
			return await userApiRepository.createUser(input.username, input.password);
		}),
});
