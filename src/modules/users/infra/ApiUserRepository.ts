import createUserCommand from '../application/commands/create-user-command';
import getUserByIdQuery from '../application/query/get-by-id-query';

export function createApiUserRepository() {
	async function createUser(username: string, password: string) {
		const newUser = await createUserCommand({
			username: username,
			password: password,
		});
		return newUser;
	}

	async function getUserById(userId: number) {
		return await getUserByIdQuery(userId);
	}

	return {
		createUser,
		getUserById,
	};
}
