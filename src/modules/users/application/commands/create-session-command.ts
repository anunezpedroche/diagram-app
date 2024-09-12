import { db } from '~/server/db';
import { IUserSessionCommand } from '../../domain/session';

export default async function createUserSessionCommand({
	expiresAt,
	payload,
	userId,
}: IUserSessionCommand) {
	return await db.userSessions
		.create({
			data: { expiresAt, payload, userId },
		})
		.catch(() => {});
}
