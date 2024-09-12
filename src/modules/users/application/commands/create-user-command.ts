import { db } from '~/server/db';
import { IUserCommand } from '../../domain/user';
import { hashPass } from '~/lib/password-management';

export default async function createUserCommand({
	username,
	password,
}: IUserCommand) {
	const encryptedPass = await hashPass(password);
	return await db.users
		.create({
			data: { username, password: encryptedPass },
		})
		.catch(() => {});
}
