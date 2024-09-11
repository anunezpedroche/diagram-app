export type User = {
	id: number;
	username: string;
	password: string;
};

export interface IUserCommand {
	username: string;
	password: string;
}
