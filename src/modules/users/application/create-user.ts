import createUserCommand from './commands/create-user-command';

export default async function createUser(username: string, password: string) {
	const newUser = await createUserCommand({ username, password });
}
