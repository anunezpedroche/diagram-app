import { checkPass } from '~/lib/password-management';
import { IUserCommand } from '../../domain/user';
import { db } from '~/server/db';

export default async function loginQuery({ username, password }: IUserCommand) {
	const user = await db.users.findUnique({ where: { username: username } });
	if (!user) {
		return;
	}
	const hashPass = user.password;
	const isCorrect = await checkPass(password, hashPass);
	if (!isCorrect) {
		return;
	}
	return user;
}
