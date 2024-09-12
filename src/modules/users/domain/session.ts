export type Session = {
	id: number;
	payload: string;
	expiresAt: Date;
	userId: number;
};

export interface IUserSessionCommand {
	expiresAt: Date;
	payload: string;
	userId: number;
}
