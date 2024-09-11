import { db } from '~/server/db';

export default async function getUserByIdQuery(userId: number) {
	return await db.users.findFirst({ where: { id: userId } });
}
