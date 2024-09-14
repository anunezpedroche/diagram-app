import { JWTPayload, jwtVerify, SignJWT } from 'jose';

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export async function encrypt<T>(payload: T, expirationTime: Date) {
	return await new SignJWT(payload as unknown as JWTPayload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(expirationTime ?? '10 sec from now')
		.sign(key);
}

export async function decrypt<T>(value: string) {
	if (!value) return;
	const { payload } = await jwtVerify(value, key, { algorithms: ['HS256'] });
	return payload as T;
}
