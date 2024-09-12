import createUserSessionCommand from '../application/commands/create-session-command';
import createUserCommand from '../application/commands/create-user-command';
import getUserByIdQuery from '../application/query/get-by-id-query';
import loginQuery from '../application/query/login';
import { IUserSessionCommand } from '../domain/session';

export function createApiUserRepository() {
	async function createUser(username: string, password: string) {
		const newUser = await createUserCommand({
			username: username,
			password: password,
		});
		return newUser;
	}

	async function login(username: string, password: string) {
		return await loginQuery({ username, password });
	}

	async function createUserSession(userSession: IUserSessionCommand) {
		return await createUserSessionCommand(userSession);
	}

	async function getUserById(userId: number) {
		return await getUserByIdQuery(userId);
	}

	return {
		createUser,
		getUserById,
		createUserSession,
		login,
	};
}
