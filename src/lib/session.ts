import { NextRequest, NextResponse } from 'next/server';
import { Session } from '~/modules/users/domain/session';
import { cookies } from 'next/headers';
import { decrypt, encrypt } from '~/lib/token-management';
import { api } from '~/trpc/server';

export async function createSession(id: number) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
export async function getSession() {
	const session = cookies().get('session')?.value;
	if (!session) return null;
	return await decrypt<Session>(session);
}

export async function deleteCookie() {
	cookies().set('session', '', {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
}

export async function login(formData: FormData) {
	const userReq = {
		username: (formData.get('username') as string) ?? '',
		password: (formData.get('password') as string) ?? '',
	};

	const userRes = await api.users.login(userReq);

	if (!userRes) {
		return null;
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt(
		{ ...userRes, userId: userRes.id, expires },
		expires,
	);
	await api.users.createSession({
		expiresAt: expires,
		payload: session,
		userId: userRes.id,
	});
	cookies().set('session', session, { expires, httpOnly: true });
	return userRes;
}
