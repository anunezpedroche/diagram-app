import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '~/lib/token-management';
import { Session } from '~/modules/users/domain/session';

const protectedRoutes = ['/diagrams', '/diagrams/[id]'];
const publicRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	const cookie = cookies().get('session')?.value ?? '';
	const session = await decrypt<Session>(cookie);

	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL('/login', request.nextUrl));
	}

	if (isPublicRoute && session?.userId) {
		return NextResponse.redirect(new URL('/diagrams', request.nextUrl));
	}
	return NextResponse.next();
}
