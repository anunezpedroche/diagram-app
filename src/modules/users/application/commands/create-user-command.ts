import { db } from '~/server/db';
import { IUserCommand } from '../../domain/user';

export default async function createUserCommand({
	username,
	password,
}: IUserCommand) {
	return await db.users
		.create({
			data: { username, password },
		})
		.catch(() => {});
}
